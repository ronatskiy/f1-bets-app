import { observable, action, computed } from "mobx";

class RacesSectionStore {
	/**
	 * @param {AppViewModel} viewModel
	 * @param {string} RACE_STORE_URL
	 */
	constructor(viewModel, RACE_STORE_URL) {
		this._appViewModel = viewModel;
		this._storeApiUrl = RACE_STORE_URL;
		this._raceInfoService = this._appViewModel._raceInfoService;
	}

	@observable isRaceResultsPanelVisible = false;
	@observable selectedRace = null;

	@computed
	get races() {
		return this._appViewModel.races;
	}

	@computed
	get racers() {
		return this._appViewModel.racers;
	}

	// async initRacesCollection() {
	// 	await RaceRepository.init();
	// 	return await this._raceInfoService.fetchAll();
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

		await this._appViewModel.operationManager.runWithProgressAsync(async () => {
			await this._raceInfoService.addOrUpdateRaceResult(this.selectedRace.id, js);
			this.isRaceResultsPanelVisible = false;
		});
	}
}

export default RacesSectionStore;
