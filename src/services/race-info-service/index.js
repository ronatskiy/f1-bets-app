import { ajax } from "../../vendors";
import { RoundAbstract } from "../../domain/round-abstract";

class RaceDto extends RoundAbstract {
	constructor({ season, raceName, bets = [], raceResults = {} }) {
		super({ season, raceName });
		this.bets = bets;
		this.raceResults = raceResults;
	}
}

export default class RaceInfoService {
	constructor({ raceInfoStoreApiUrl }) {
		this._apiUrl = raceInfoStoreApiUrl;
	}

	/**
	 * @return {Promise<RaceDto[]>}
	 */
	async fetchAll() {
		return (await ajax.get(this._apiUrl)).map(data => {
			return new RaceDto(data);
		});
	}

	/**
	 * @param {RaceDto[]} races
	 * @return {Promise}
	 */
	saveAll(races) {
		return ajax.put(this._apiUrl, races);
	}

	/**
	 * @param betInfo
	 * @param {RaceDto} newRace
	 * @return {Promise}
	 */
	async addOrUpdateBet(betInfo, newRace) {
		const allRaces = await this.fetchAll();
		let races = [];

		if (allRaces.some(r => r.roundId === newRace.roundId)) {
			races = allRaces.map(race => {
				if (race.roundId === newRace.roundId) {
					const index = race.bets.findIndex(bet => bet.userInfo.id === betInfo.userInfo.id);

					if (index > -1) {
						return RaceInfoService._updateBet(race, betInfo, index);
					}

					return RaceInfoService._addBet(race, betInfo);
				}
				return race;
			});
		} else {
			races = [...allRaces, new RaceDto({ ...newRace, bets: [betInfo] })];
		}

		return this.saveAll(races);
	}

	async updateRaceResult(roundId, raceResults) {
		const allRaces = await this.fetchAll();
		const index = allRaces.findIndex(race => race.roundId === roundId);

		if (index > -1) {
			allRaces[index].raceResults = {
				...allRaces[index].raceResults,
				...raceResults,
			};
		}

		return this.saveAll(allRaces);
	}

	static _addBet(race, betInfo) {
		race.bet.push(betInfo);

		return race;
	}

	static _updateBet(race, betInfo, index) {
		race.bets[index] = betInfo;

		return race;
	}
}
