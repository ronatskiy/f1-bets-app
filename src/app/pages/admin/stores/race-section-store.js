import { observable } from "mobx";
import { RaceRepository } from "../../../../storage";

class RaceSectionStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@observable isRaceResultsPanelVisible = false;
	@observable selectedRace = null;

	async initRacesCollection() {
		await RaceRepository.init();
		return await this.rootStore.racesStore.fetchRaces();
	}

	get raceStoreUrl() {
		return RaceRepository.DATA_STORE_URL;
	}

	showRaceResultsPanel() {
		this.isRaceResultsPanelVisible = true;
	}

	async addOrUpdateRaceResults(js) {
		if (!this.selectedRace) {
			window.alert("Выберите гонку!");
			return;
		}

		if (Object.values(js).filter(racer => Boolean(racer)).length < 10) {
			window.alert("Не все гоншики выбраны!");
			return;
		}
		this.rootStore.pendingTasksCount++;
		await RaceRepository.addOrUpdateRaceResult(this.selectedRace.id, js);
		this.rootStore.pendingTasksCount--;

		this.isRaceResultsPanelVisible = false;
	}
}

export default RaceSectionStore;
