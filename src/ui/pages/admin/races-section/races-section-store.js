import { observable, action, computed, runInAction } from "mobx";

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

	get storeApiUrl() {
		return this._storeApiUrl;
	}

	@action
	showRaceResultsPanel(race) {
		this.selectedRace = race;
		this.isRaceResultsPanelVisible = true;
	}

	async addOrUpdateRaceResults(js) {
		if (!this.selectedRace) {
			window.alert("Выберите гонку!");
			return;
		}

		if (Object.values(js).filter(racer => Boolean(racer)).length < 20) {
			window.alert("Выбраны не все гоншики !");
			return;
		}

		await this._appModel.operationManager.runWithProgressAsync(async () => {
			await this._racesInfoService.updateRaceResult(this.selectedRace.roundId, js);

			runInAction(() => {
				this.selectedRace = null;
			});
		});
	}

	addNewBet = (bets, race) => {
		return this._appModel.addNewBet(bets, race);
	};
}

export default RacesSectionStore;
