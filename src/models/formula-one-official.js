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
	}

	/** @type {ExtendedRoundInfo[]} */
	@observable roundsInfo = [];

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
}
