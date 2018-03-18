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
			this.teams = await TeamRepository.getAll();
		} catch (error) {
			console.error("Can't load 'teams' in 'TeamsStore'", error);
		}
	}
}

export default TeamsStore;
