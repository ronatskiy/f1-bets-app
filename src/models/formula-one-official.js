import { observable, runInAction } from "mobx";
import configProvider from "../config/config";

export default class FormulaOneOfficialModel {
	/**
	 * @param {FormulaOneOfficialDataService} formulaOneOfficialDataService
	 * @param {OperationManager} operationManager
	 */
	constructor({ formulaOneOfficialDataService, operationManager }) {
		this._service = formulaOneOfficialDataService;
		this._operationManager = operationManager;
		this._currentSeason = configProvider.getCurrentSeason();
	}

	/** @type {FormulaOneRound[]} */
	@observable currentSeasonRounds = [];

	/** @type {RaceResult[]} */
	@observable currentSeasonRacesResults = [];

	/** @type {Racer[]} */
	@observable currentSeasonRacers = [];

	/**
	 * @return {string}
	 */
	get currentSeason() {
		return this._currentSeason;
	}

	async fetchAll() {
		await this._fetchRacesSchedule();
		await this._fetchRacers();
		await this._fetchRacesResults();
	}

	async _fetchRacesSchedule() {
		return this._operationManager.runWithProgressAsync(async () => {
			const roundsInfo = await this._service.fetchSeasonRoundsSchedule(this.currentSeason);

			runInAction(() => {
				this.currentSeasonRounds = roundsInfo;
			});
		});
	}

	async _fetchRacesResults() {
		return this._operationManager.runWithProgressAsync(async () => {
			const racesResults = await this._service.fetchRacesResults(this.currentSeason);

			runInAction(() => {
				this.currentSeasonRacesResults = racesResults;
			});
		});
	}

	async _fetchRacers() {
		return this._operationManager.runWithProgressAsync(async () => {
			const racers = await this._service.fetchRacers(this.currentSeason);

			runInAction(() => {
				this.currentSeasonRacers = racers;
			});
		});
	}
}
