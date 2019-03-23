import { computed } from "mobx";
import WeekendInfoModel from "../models/weekend-info-view-model";
import SeasonViewModel from "../models/season-model";
import { isAfter } from "../../../../helpers/time-modification";
import RacerViewModel from "../models/racer-view-model";

export default class HomePageStore {
	/**
	 * @param {AppModel} appModel
	 */
	constructor(appModel) {
		this._appModel = appModel;
	}

	/**
	 * @return {boolean}
	 */
	get isAuthenticated() {
		return this._appModel.isUserAuthenticated;
	}

	/**
	 * @return {boolean}
	 */
	get isUserAlreadyBet() {
		return this._appModel.isUserAlreadyBet;
	}

	/**
	 * @return {boolean}
	 */
	get isBetsAllowed() {
		return this._appModel.isBetsAllowed;
	}

	/**
	 * @return {string}
	 */
	get currentSeason() {
		return this._appModel.currentSeason;
	}

	/**
	 * @return {number}
	 */
	@computed
	get currentSeasonRacesCount() {
		return this._appModel.currentSeasonHistory.races.length;
	}

	/**
	 * @return {WeekendInfoModel}
	 */
	@computed
	get nextWeekend() {
		const nextRace = this._appModel.nextRace;

		return nextRace ? new WeekendInfoModel(nextRace) : null;
	}

	@computed
	get seasons() {
		return this._appModel.formulaOneHistory.historiesBySeason.map(({ season, isLoaded, races }) => {
			const weekends = this._mapRacesToWeekendsModel(
				(season === this.currentSeason
					? races.filter(
							r =>
								this.nextWeekend &&
								this.nextWeekend.raceStartTime !== r.raceStartTime &&
								!isAfter(r.raceStartTime, this.nextWeekend.raceStartTime),
					  )
					: races
				).reverse(),
				season,
			);

			return new SeasonViewModel({
				season,
				isLoaded,
				weekends,
			});
		});
	}

	loadSeasonHistory(season) {
		this._appModel.loadSeasonData(season);
	}

	_mapRacesToWeekendsModel(races, season) {
		if (races.length > 0) {
			const racesResults = this._appModel.formulaOneHistory.getRacesResults(season);

			return races.map((race, index) => {
				const wi = new WeekendInfoModel(race);

				if (racesResults.length > 0 && index < racesResults.length) {
					const racerStandings = racesResults[index].racersStandings.map(
						/** @type {Racer} */ racer => new RacerViewModel(racer),
					);

					return wi.addRacerStandings(racerStandings);
				}
				return wi;
			});
		}

		return [];
	}
}
