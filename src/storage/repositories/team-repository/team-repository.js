import { Teams2018 } from "./data";

function loadTeams() {
	return Promise.resolve(Teams2018);
}

const TeamRepository = {
	DATA_STORE_URL: "",

	init() {},

	getAll() {
		return loadTeams();
	},

	async getById(teamName) {
		return Promise.resolve(Teams2018.find(teamName));
	},
};

export default TeamRepository;
