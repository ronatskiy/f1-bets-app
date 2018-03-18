import moment from "moment";
import { computed, observable, action } from "mobx";
import { RaceRepository } from "../storage";
import isEqual from "lodash.isequal";

class RacesStore {
	@observable races = [];

	@computed({
		equals: isEqual,
	})
	get nextRace() {
		const currentDate = moment();
		const [nextRace] = this.races.filter(r => moment(r.raceStartTime).isAfter(currentDate));

		return nextRace;
	}

	constructor(rootStore) {
		this.rootStore = rootStore;
		this.fetchRaces();
	}

	@action
	async fetchRaces() {
		try {
			this.races = await RaceRepository.getAll();
		} catch (error) {
			console.error("Can't load 'races' in 'RacesStore'", error);
		}
	}

	@action
	async addNewBets(bet) {
		try {
			await RaceRepository.addOrUpdateBet(bet, this.nextRace.id);
		} catch (error) {
			console.error("Can't update Bet in 'RacesStore'", error);
		}
		await this.fetchRaces();
	}
}

export default RacesStore;
