import { computed } from "mobx";
import { isAfter } from "../../../helpers/time-modification";
import WeekendInfoModel from "../models/weekend-info-view-model/index";
import RacerViewModel from "../models/racer-view-model";

export default class HomePageStore {
	/**
	 * @param {AppModel} appModel
	 */
	constructor(appModel) {
		this._appModel = appModel;
	}

	get nextRace() {
		return this._appModel.nextRace;
	}

	get isAuthenticated() {
		return this._appModel.session.isAuthenticated;
	}

	get isUserAlreadyBet() {
		return this._appModel.isUserAlreadyBet;
	}

	get isBetsAllowed() {
		return this._appModel.isBetsAllowed;
	}

	/**
	 * @return {WeekendInfoModel}
	 */
	@computed
	get nextRaceInfo() {
		const now = this._appModel.timeWatcher.currentTime;

		const [nextRace] = this._appModel.formulaOneOfficial.currentSeasonRounds
			.map(race => new WeekendInfoModel(race))
			.filter(r => isAfter(r.raceStartTime, now));

		return nextRace;
	}

	/**
	 * @return {WeekendInfoModel[]}
	 */
	@computed
	get previousRaces() {
		const now = this._appModel.timeWatcher.currentTime;

		return this._appModel.formulaOneOfficial.currentSeasonRounds
			.map(race => new WeekendInfoModel(race))
			.filter(wi => !isAfter(wi.raceStartTime, now))
			.map((wi, index) => {
				if (this._raceResults.length > 0 && index < this._raceResults.length) {
					const racerStandings = this._raceResults[index].racersStandings.map(
						/** @type {Racer} */ racer => new RacerViewModel(racer),
					);

					return wi.addRacerStandings(racerStandings);
				}
				return wi;
			})
			.reverse();
	}

	/**
	 * @return {RaceResult[]}
	 * @private
	 */
	@computed
	get _raceResults() {
		return this._appModel.formulaOneOfficial.currentSeasonRacesResults;
	}
}
