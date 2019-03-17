import { observable, action, computed } from "mobx";

class RacesSectionStore {
	/**
	 * @param {AppModel} appModel
	 * @param {string} RACE_STORE_URL
	 * @param {RacesInfoService} racesInfoService
	 */
	constructor(appModel, RACE_STORE_URL, racesInfoService) {
		this._appModel = appModel;
		this._storeApiUrl = RACE_STORE_URL;
		this._racesInfoService = racesInfoService;
	}

	@observable isRaceResultsPanelVisible = false;
	/** @type {Race} */
	@observable selectedRace = null;

	/**
	 * @return {User[]}
	 */
	@computed
	get users() {
		return this._appModel.usersModel.users;
	}

	@computed
	get races() {
		return this._appModel.currentSeasonHistory.races;
	}

	@computed
	get racers() {
		return this._appModel.currentSeasonHistory.racers;
	}

	// async initRacesCollection() {
	// 	await RaceRepository.init();
	// 	return await this._racesInfoService.fetchAll();
	// }

	get storeApiUrl() {
		return this._storeApiUrl;
	}

	@action
	showRaceResultsPanel() {
		this.isRaceResultsPanelVisible = true;
	}

	@action
	async addOrUpdateRaceResults(js) {
		if (!this.selectedRace) {
			window.alert("Выберите гонку!");
			return;
		}

		if (Object.values(js).filter(racer => Boolean(racer)).length < 10) {
			window.alert("Не все гоншики выбраны!");
			return;
		}

		await this._appModel.operationManager.runWithProgressAsync(async () => {
			await this._racesInfoService.updateRaceResult(this.selectedRace.roundId, js);
			this.isRaceResultsPanelVisible = false;
		});
	}

	addNewBet = bets => {
		return this._appModel.addNewBet(bets);
	};
}

export default RacesSectionStore;
