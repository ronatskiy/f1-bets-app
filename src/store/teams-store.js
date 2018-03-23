import { observable } from "mobx";
import { TeamRepository } from "../storage";

class TeamsStore {
	@observable teams = [];

	constructor(rootStore) {
		this.rootStore = rootStore;
		this._loadTeams();
	}

	async _loadTeams() {
		try {
			this.rootStore.pendingTasksCount++;
			this.teams = await TeamRepository.getAll();
			this.rootStore.pendingTasksCount--;
		} catch (error) {
			this.rootStore.pendingTasksCount--;
			console.error("Can't load 'teams' in 'TeamsStore'", error);
		}
	}
}

export default TeamsStore;
