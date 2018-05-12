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
	 * @param {Racer[]} racers
	 */
	constructor({ race, racers = [] }) {
		this.raceId = race.id;
		this.raceTitle = race.prettyTitle;

		if (racers.length > 0) {
			this._officialResultsBetMap = this._convertToBetMap(racers);
			this._officialResults = UserBetsResult.createOfficialResults(this._officialResultsBetMap);
		}

		this._userVotes = race.bets.map(
			betInfo =>
				new UserBetsResult(
					{
						userName: betInfo.userInfo.name,
						userId: betInfo.userInfo.id,
						userBetsMap: betInfo.betsMap,
					},
					this._officialResultsBetMap,
				),
		);
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
		return racers.reduce((betMap, racer, index) => ({ ...betMap, [index + 1]: racer.abbreviation }), {});
	}
}

export default RaceInformation;
