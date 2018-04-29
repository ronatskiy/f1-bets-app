import { observable, runInAction } from "mobx";

export default class FormulaOneOfficialModel {
	/**
	 * @param {FormulaOneOfficialDataService} formulaOneOfficialDataService
	 * @param {OperationManager} operationManager
	 */
	constructor({ formulaOneOfficialDataService, operationManager }) {
		this._service = formulaOneOfficialDataService;
		this._operationManager = operationManager;

		this._fetchRacesSchedule();
		this._fetchRacesResults();
	}

	/** @type {ExtendedRoundInfo[]} */
	@observable roundsInfo = [];

	/** @type {RaceResult[]} */
	@observable racesResults = [];

	async _fetchRacesSchedule() {
		return this._operationManager.runWithProgressAsync(async () => {
			try {
				const roundsInfo = await this._service.fetchSeasonRoundsSchedule();

				runInAction(() => {
					this.roundsInfo = roundsInfo;
				});
			} catch (e) {
				console.error(e.message);
			}
		});
	}

	async _fetchRacesResults() {
		return this._operationManager.runWithProgressAsync(async () => {
			try {
				const racesResults = await this._service.fetchRacesResults();

				runInAction(() => {
					this.racesResults = racesResults;
				});
			} catch (e) {
				console.error(e.message);
			}
		});
	}
}
