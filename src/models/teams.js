import { observable } from "mobx";

class TeamsStore {
	constructor({ rootStore, teamService }) {
		this._rootStore = rootStore;
		this._teamService = teamService;
		this._loadTeams();
	}

	@observable teams = [];

	async _loadTeams() {
		return this._rootStore.operationWithProgressAsync(async () => {
			try {
				return (this.teams = await this._teamService.fetchAll());
			} catch (error) {
				console.log("Can't load 'teams' in 'TeamsStore'", error);
			}
		});
	}
}

export default TeamsStore;
