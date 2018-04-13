import { Teams2018 } from "./data";

function loadTeams() {
	return Promise.resolve(Teams2018);
}

export default class TeamService {
	async fetchAll() {
		return await loadTeams();
	}

	async getById(teamName) {
		return Promise.resolve(Teams2018.find(teamName));
	}
}
