import moment from "moment";
import { computed, observable, action } from "mobx";

import { RaceRepository } from "../storage";
import isEqual from "lodash.isequal";

class RacesStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this.fetchRaces();
	}

	@observable races = [];

	/**
	 * @return {Race | null}
	 */
	@computed.equals(isEqual)
	get nextRace() {
		const currentDate = moment();
		const [nextRace] = this.races.filter(r => moment(r.raceStartTime).isAfter(currentDate));

		return nextRace;
	}

	@action
	async fetchRaces() {
		try {
			this.rootStore.pendingTasksCount++;
			this.races = await RaceRepository.getAll();
			this.rootStore.pendingTasksCount--;
		} catch (error) {
			this.rootStore.pendingTasksCount--;
			console.log("Can't load 'races' in 'RacesStore'!!\n", error);
		}
	}

	@action
	async addNewBet(bet) {
		try {
			this.rootStore.pendingTasksCount++;
			await RaceRepository.addOrUpdateBet(bet, this.nextRace.id);
			await this.fetchRaces();
			this.rootStore.pendingTasksCount--;
		} catch (error) {
			this.rootStore.pendingTasksCount--;
			console.error("Can't update Bet in 'RacesStore'", error);
		}
	}
}

export default RacesStore;
