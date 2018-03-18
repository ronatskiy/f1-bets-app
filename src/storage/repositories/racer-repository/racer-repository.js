import { RACERS_MAP } from "./data";

function loadRacers({ season = 2018 } = {}) {
	return Promise.resolve([...RACERS_MAP.values()]);
}

const RacerRepository = {
	DATA_STORE_URL: "",

	init() {},

	getAll() {
		return loadRacers();
	},

	getById(id) {
		return Promise.resolve(RACERS_MAP.get(id));
	},
};

export default RacerRepository;
