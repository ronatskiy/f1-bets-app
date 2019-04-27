import sortBy from "lodash.sortby";

import UserBetsResult from "./user-bets-result";

/**
 * @property {string} raceId
 * @property {string} raceTitle
 * @property {boolean} hasOfficialResults
 * @property {UserBetsResult[]} userBetsResults
 */
class RaceInformation {
	_officialResults = null;
	_officialResultsBetMap = null;

	/**
	 * @param {Race} race
	 * @param {Racer[]} finishedRacers
	 * @param {function} getUserName
	 */
	constructor({ race, finishedRacers = [], getUserName = () => "" }) {
		this.raceId = race.roundId;
		this.raceTitle = race.prettyTitle + " " + race.season;

		if (finishedRacers.length > 0) {
			this._officialResultsBetMap = this._convertToBetMap(finishedRacers);
			this._officialResults = UserBetsResult.createOfficialResults(this._officialResultsBetMap);
		}

		this._userVotes = race.bets.map(betInfo => {
			const userId = betInfo.userInfo.id;
			const userName = getUserName(userId);

			return new UserBetsResult(
				{
					userId,
					userName,
					userBetsMap: betInfo.betsMap,
				},
				this._officialResultsBetMap,
			);
		});
	}

	get hasOfficialResults() {
		return this._officialResults !== null;
	}

	/**
	 * @return {UserBetsResult[]}
	 */
	get userBetsResults() {
		if (this.hasOfficialResults) {
			const sortedVotes = sortBy(this._userVotes, ub => -ub.userScore.value);

			return [this._officialResults, ...sortedVotes];
		}

		return [...this._userVotes];
	}

	/**
	 * @return {UserBetsResult}
	 */
	get userVotes() {
		return this._userVotes;
	}

	/**
	 * @param {Racer[]} racers
	 * @return {*}
	 * @private
	 */
	_convertToBetMap(racers) {
		return racers.reduce((betMap, racer, index) => ({ ...betMap, [index + 1]: racer.code }), {});
	}
}

export default RaceInformation;
