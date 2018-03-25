import { computed } from "mobx";
import BetInfo from "../../../../storage/types/bet-info";
import UserInfo from "../../../../storage/types/user-info";

class UserBetsResult {
	/**
	 * @param {BetInfo} betInfo
	 * @param officialResults
	 */
	constructor(betInfo, officialResults) {
		this.betInfo = betInfo;
		this.score = officialResults ? this._calcScore(officialResults, betInfo) : { value: 0, tooltip: "" };
	}

	/**
	 * @param officialResults
	 * @param {BetInfo} betInfo
	 */
	_calcScore(officialResults, betInfo) {
		let score = [];

		const officialResultsRacers = Object.values(officialResults.betsMap);

		for (let [pos, racerCode] of Object.entries(betInfo.betsMap)) {
			const predicate = code => code === racerCode;
			let _score = 0;
			if (officialResultsRacers.some(predicate)) {
				const index = officialResultsRacers.findIndex(predicate) + 1;

				if (index === Number(pos)) {
					_score = _score + this._posToPoints(pos);
				} else {
					_score = _score + 2;
				}
			}

			score.push(_score);
		}

		return {
			value: score.reduce((a, b) => a + b, 0),
			tooltip: score.join("-"),
		};
	}

	_posToPoints(pos) {
		const posNumber = Number(pos);
		if (posNumber === 1) {
			return 25;
		}

		if (posNumber === 2) {
			return 18;
		}

		if (posNumber === 3) {
			return 15;
		}

		return 10;
	}
}

class ResultsPageSrore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@computed
	get currentUser() {
		return this.rootStore.sessionStore.currentUser;
	}

	@computed
	get allBetsData() {
		return this.rootStore.racesStore.races.map(race => {
			const resultTitle = "Formula 1 (Official)";
			const { results } = race.officialData;
			const betsData = {
				raceId: race.id,
				raceTitle: race.prettyTitle,
				hasRaceResults: false,
				usersBets: race.bets.map(betInfo => new UserBetsResult(betInfo)),
			};

			if (results) {
				const officialResults = new BetInfo({
					userInfo: new UserInfo({ name: resultTitle, id: "official-results" }),
					betsMap: results,
				});

				betsData.hasRaceResults = true;
				betsData.usersBets = [
					new UserBetsResult(officialResults),
					...race.bets.map(betInfo => new UserBetsResult(betInfo, officialResults)),
				];
			}

			return betsData;
		});
	}
}

export default ResultsPageSrore;
