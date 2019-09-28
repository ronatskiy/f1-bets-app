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
	_qualifyingResults = null;

	/**
	 * @param {Race} race
	 * @param {Racer[]} finishedRacers
	 * @param {function} getUserName
	 * @param {[]} qualifyingResults
	 */
	constructor({ race, finishedRacers = [], getUserName = () => "", qualifyingResultsStandings = [] }) {
		this.raceId = race.roundId;
		this.raceTitle = race.prettyTitle + " " + race.season;

		if (finishedRacers.length > 0) {
			this._officialResultsBetMap = this._convertToBetMap(finishedRacers);
			this._officialResults = UserBetsResult.createOfficialResults(this._officialResultsBetMap);
		}

		if (qualifyingResultsStandings.length > 0) {
			const qualifyingResults = this._convertToBetMap(qualifyingResultsStandings);
			this._qualifyingResults = UserBetsResult.createQualifyingResults(qualifyingResults);
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

	get hasQualifyingResults() {
		return this._qualifyingResults !== null;
	}

	/**
	 * @return {UserBetsResult[]}
	 */
	get userBetsResults() {
		const extraResults = [];

		if (this.hasOfficialResults) {
			extraResults.push(this._officialResults);
		}

		if (this.hasQualifyingResults) {
			extraResults.push(this._qualifyingResults);
		}

		return [...extraResults, ...this.userVotes];
	}

	/**
	 * @return {UserBetsResult}
	 */
	get userVotes() {
		if (this.hasOfficialResults) {
			return sortBy(this._userVotes, ub => -ub.userScore.value);
		}

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
