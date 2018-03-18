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
			console.error("Can't load 'racers' in 'RacerStore'", error);
		}
	}
}

export default RacerStore;
