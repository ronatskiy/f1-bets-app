class RacesModel {
	/**
	 * @param {OperationManager} operationManager
	 * @param {RacesInfoService} racesInfoService
	 */
	constructor({ operationManager, racesInfoService }) {
		this._racesInfoService = racesInfoService;
		this._operationManager = operationManager;
	}

	/**
	 * @param {string} season
	 * @return {Promise<RaceDto[]>}
	 */
	async fetchSeasonRaces(season) {
		return this._operationManager.runWithProgressAsync(async () => {
			return this._operationManager.runWithProgressAsync(() => {
				return this._racesInfoService.fetchAll();
			});
		});
	}
}

export default RacesModel;
