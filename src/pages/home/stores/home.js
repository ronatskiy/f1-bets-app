import { computed } from "mobx";
import { isAfter } from "../../../helpers/time-modification";
import WeekendInfoModel from "../models/weekend-info-view-model/index";
import RacerViewModel from "../models/racer-view-model";

export default class HomePageStore {
	/**
	 * @param {AppViewModel} viewModel
	 */
	constructor(viewModel) {
		this._appViewModel = viewModel;
	}

	get nextRace() {
		return this._appViewModel.nextRace;
	}

	get isAuthenticated() {
		return this._appViewModel.session.isAuthenticated;
	}

	get isUserAlreadyBet() {
		return this._appViewModel.isUserAlreadyBet;
	}

	get isBetsAllowed() {
		return this._appViewModel.isBetsAllowed;
	}

	/**
	 * @return {WeekendInfoModel}
	 */
	@computed
	get nextRaceInfo() {
		const now = this._appViewModel.timeWatcher.currentTime;

		const [nextRace] = this._appViewModel.formulaOneOfficial.roundsInfo
			.map(race => new WeekendInfoModel(race))
			.filter(r => isAfter(r.raceStartTime, now));

		return nextRace;
	}

	/**
	 * @return {WeekendInfoModel[]}
	 */
	@computed
	get previousRaces() {
		const now = this._appViewModel.timeWatcher.currentTime;

		return this._appViewModel.formulaOneOfficial.roundsInfo
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
		return this._appViewModel.formulaOneOfficial.racesResults;
	}
}
