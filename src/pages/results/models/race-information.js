import sortBy from "lodash.sortby";

import UserBetsResult from "./user-bets-result";

/**
 * @class RaceInformation
 * @property {string} raceId
 * @property {string} raceTitle
 * @property {boolean} hasOfficialResults
 * @property {UserBetsResult[]} userBetsResults
 */
class RaceInformation {
	_officialResults = null;
	userBetsResults = [];

	constructor({ race, racers = [] }) {
		this.raceId = race.id;
		this.raceTitle = race.prettyTitle;

		this._tryAddOfficialResults(racers);
		let userBets = race.bets.map(betInfo => new UserBetsResult(betInfo, this._officialResults));

		if (this.hasOfficialResults) {
			userBets = sortBy(userBets, ub => -ub.userScore.value);
		}

		this.userBetsResults = [...this.userBetsResults, ...userBets];
	}

	get hasOfficialResults() {
		return this._officialResults !== null;
	}

	_tryAddOfficialResults(racers) {
		if (racers.length > 0) {
			const results = racers
				.slice(0, 10)
				.reduce((betMap, racer, index) => ({ ...betMap, [index + 1]: racer.abbreviation }), {});

			if (results) {
				this._officialResults = UserBetsResult.createOfficialResults(results);
				this.userBetsResults.push(this._officialResults);
			}
		}
	}
}

export default RaceInformation;
