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
			this.racers = await RacerRepository.getAll();
		} catch (error) {
			console.log("Can't load 'racers' in 'RacerStore'!!\n", error);
		}
	}
}

export default RacerStore;
