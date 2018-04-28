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

	@observable racesSchedule = [];

	async _fetchRacesSchedule() {
		return this._operationManager.runWithProgressAsync(async () => {
			try {
				const races = await this._service.fetchRaceScheduleInfo();

				runInAction(() => {
					this.racesSchedule = races.map(race => ({
						...race,
						calendar: this._service.findCalendarByRoundNumber(race.round),
					}));
				});
			} catch (e) {
				console.error(e.message);
			}
		});
	}
}
