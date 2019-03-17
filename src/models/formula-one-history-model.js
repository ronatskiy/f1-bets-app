import { action, computed, observable, runInAction } from "mobx";
import sortBy from "lodash.sortby";

import FormulaOneDataProviderModel from "./formula-one-data-provider-model";
import RacesModel from "./races-model";
import Race from "../domain/race";

/**
 * @property {Racer[]} racers
 * @property {Race[]} races
 */
class History {
	constructor({ season = "", isLoaded = false, rounds = [], racesResults = [], racers = [], races = [] } = {}) {
		this.season = season;
		this.isLoaded = isLoaded;
		this.rounds = rounds;
		this.racesResults = racesResults;
		this.racers = racers;
		this.races = races;
	}
}

export default class FormulaOneHistoryModel {
	/**
	 * @param {string} currentSeason
	 * @param {RacesInfoService} racesInfoService
	 * @param {FormulaOneOfficialDataService} formulaOneOfficialDataService
	 * @param {OperationManager} operationManager
	 */
	constructor(currentSeason, { racesInfoService, formulaOneOfficialDataService }, operationManager) {
		this._currentSeason = currentSeason;
		this._racesModel = new RacesModel({ operationManager, racesInfoService });
		this._formulaOneOfficialModel = new FormulaOneDataProviderModel({
			operationManager,
			formulaOneOfficialDataService,
		});
		this.availableSeasons = ["2019", "2018"];
		this._initSeasonsHistory();
	}

	@observable
	seasonsHistory = new Map();

	@action
	_initSeasonsHistory() {
		this.seasonsHistory = new Map(this.availableSeasons.map(season => [season, new History({ season })]));
	}

	/**
	 * @return {History}
	 */
	get currentSeasonHistory() {
		if (this.seasonsHistory.has(this._currentSeason)) {
			return this.seasonsHistory.get(this._currentSeason);
		}

		return new History();
	}

	/**
	 * @param {string} season
	 * @return {FormulaOneRound[]}
	 */
	getRounds(season) {
		return this._withSeasonExistCheck(season, this.seasonsHistory.get(season).rounds);
	}

	/**
	 * @param {string} season
	 * @return {RaceResult[]}
	 */
	getRacesResults(season) {
		return this._withSeasonExistCheck(season, this.seasonsHistory.get(season).racesResults);
	}

	/**
	 * @param {string} season
	 * @return {Racer[]}
	 */
	getRacers(season) {
		return this._withSeasonExistCheck(season, this.seasonsHistory.get(season).racers);
	}

	/**
	 * @param {string} season
	 * @return {Race[]}
	 */
	getRaces(season) {
		return this._withSeasonExistCheck(season, this.seasonsHistory.get(season).races);
	}

	/**
	 * @param {string} season
	 * @param {boolean} refresh
	 * @return {Promise<void>}
	 */
	async loadSeasonHistory(season, refresh = false) {
		if (this.seasonsHistory.has(season) && this.seasonsHistory.get(season).isLoaded && !refresh) {
			return;
		}

		const [rounds, racesResults, racers, races] = await Promise.all([
			this._formulaOneOfficialModel.fetchRounds(season),
			this._formulaOneOfficialModel.fetchRacesResults(season),
			this._formulaOneOfficialModel.fetchRacers(season),
			this._racesModel.fetchSeasonRaces(season),
		]);

		runInAction(() => {
			this.seasonsHistory.set(
				season,
				new History({
					season,
					isLoaded: true,
					rounds,
					racesResults,
					racers,
					races: rounds.map(round => {
						const relativeRace = races.find(race => race.roundId === round.roundId);

						return new Race({
							...round,
							bets: relativeRace ? relativeRace.bets : [],
							raceResults: relativeRace ? relativeRace.raceResults : {},
						});
					}),
				}),
			);
		});
	}

	@computed
	get historiesBySeason() {
		const histories = Array.from(this.seasonsHistory.entries()).map(([season, history]) => history);
		const historiesBySeason = sortBy(histories, ["season"]);

		return historiesBySeason.reverse();
	}

	_withSeasonExistCheck(season, array) {
		if (this.seasonsHistory.has(season)) {
			return array;
		}

		return [];
	}
}
