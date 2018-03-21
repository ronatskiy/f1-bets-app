import { RACE_STORE_URL } from "../../../config/config";
import { fetchData, updateData } from "../../web-api";
import initialData from "./initial-data";
import Race from "../../types/race";

async function fetchCollection() {
	return (await fetchData(RACE_STORE_URL)).map(Race.fromJs);
}

function updateCollection(collection) {
	return updateData(RACE_STORE_URL, collection);
}

const RaceRepository = {
	DATA_STORE_URL: RACE_STORE_URL,

	init() {
		return updateCollection(initialData);
	},

	getAll() {
		return fetchCollection();
	},

	async addOrUpdateBet(betInfo, raceId) {
		const allRaces = await fetchData(RACE_STORE_URL);
		const races = allRaces.map(race => {
			if (race.id === raceId) {
				if (race.bets.some(bet => bet.userInfo.id === betInfo.userInfo.id)) {
					race.bets = [...race.bets.filter(bet => bet.userInfo.id !== betInfo.userInfo.id), betInfo];
				} else {
					race.bets.push(betInfo);
				}
			}
			return race;
		});

		updateCollection(races);
	},
};

export default RaceRepository;
