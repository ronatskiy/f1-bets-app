import { RACERS_MAP } from "./data";

function loadRacers() {
	return Promise.resolve([...RACERS_MAP.values()]);
}
export default class RacerService {
	fetchAll() {
		return loadRacers();
	}

	getById(id) {
		return Promise.resolve(RACERS_MAP.get(id));
	}
}
