import { observable } from "mobx";
import { RacerRepository } from "../storage";

class RacerStore {
	@observable racers = [];

	constructor(rootStore) {
		this.rootStore = rootStore;
		this._loadRacers();
	}

	async _loadRacers() {
		try {
			this.rootStore.pendingTasksCount++;
			this.racers = await RacerRepository.getAll();
			this.rootStore.pendingTasksCount--;
		} catch (error) {
			this.rootStore.pendingTasksCount--;
			console.log("Can't load 'racers' in 'RacerStore'!!\n", error);
		}
	}
}

export default RacerStore;
