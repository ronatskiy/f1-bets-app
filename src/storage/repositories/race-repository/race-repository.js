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
				const index = race.bets.findIndex(bet => bet.userInfo.id === betInfo.userInfo.id);
				if (index > -1) {
					race.bets[index] = betInfo;
				} else {
					race.bets.push(betInfo);
				}
			}
			return race;
		});

		return updateCollection(races);
	},
};

export default RaceRepository;
