import { fetchData, updateData } from "../helpers/web-api";
import Race from "../../domain/race";

export default class RaceInfoService {
	constructor({ raceInfoStoreApiUrl }) {
		this._apiUrl = raceInfoStoreApiUrl;
	}

	/**
	 * @return {Promise<Race[]>}
	 */
	async fetchAll() {
		return (await fetchData(this._apiUrl)).map(Race.fromJs);
	}

	async addOrUpdateBet(betInfo, raceId) {
		const allRaces = await await fetchData(this._apiUrl);
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

		return await updateData(this._apiUrl, races);
	}

	async addOrUpdateRaceResult(raceId, js) {
		const allRacesRawData = await await fetchData(this._apiUrl);
		const index = allRacesRawData.findIndex(r => r.id === raceId);

		if (index > -1) {
			allRacesRawData[index].officialData = {
				...allRacesRawData[index].officialData,
				results: js,
			};
		}

		return await updateData(this._apiUrl, allRacesRawData);
	}
}
