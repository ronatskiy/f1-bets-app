export default class FormulaOneDataProviderModel {
	/**
	 * @param {OperationManager} operationManager
	 * @param {FormulaOneOfficialDataService} formulaOneOfficialDataService
	 */
	constructor({ operationManager, formulaOneOfficialDataService }) {
		this._service = formulaOneOfficialDataService;
		this._operationManager = operationManager;
	}

	/**
	 * @param {string} season
	 * @return {Promise<FormulaOneRound[]>}
	 */
	fetchRounds(season) {
		return this._operationManager.runWithProgressAsync(() => {
			return this._service.fetchSeasonRounds(season);
		});
	}

	/**
	 * @param {string} season
	 * @return {Promise<RaceResult[]>}
	 */
	fetchRacesResults(season) {
		return this._operationManager.runWithProgressAsync(() => {
			return this._service.fetchRacesResults(season);
		});
	}

	/**
	 * @param {string} season
	 * @return {Promise<Racer[]>}
	 */
	fetchRacers(season) {
		return this._operationManager.runWithProgressAsync(() => {
			return this._service.fetchRacers(season);
		});
	}
}
