import calcScore from "./helpers/calc-score";
import UserInfo from "../../../../domain/user-info";

const OFFICIAL_RESULTS_USER_NAME = "Formula 1 (Race results)";
export const OFFICIAL_RESULTS_USER_ID = "official-results";

const QUALIFICATION_RESULTS_USER_NAME = "Formula 1 (Qualification)";
export const QUALIFICATION_RESULTS_USER_ID = "qualification-results";

/**
 * @extends UserInfo
 * @property {BetScore} userScore
 * @property {Object} userPoll
 */
class UserBetsResult extends UserInfo {
	/**
	 * @param {Object} user
	 * @param {!string} user.userName
	 * @param {!string} user.userId
	 * @param {Object} user.userBetsMap
	 * @param {?Object} officialResultsBetMap
	 */
	constructor({ userName: name, userId: id, userBetsMap }, officialResultsBetMap = null) {
		super({ name, id });
		this.userPoll = userBetsMap;
		this.userScore = calcScore(userBetsMap, officialResultsBetMap);
	}

	static createOfficialResults(officialResults) {
		return new UserBetsResult({
			userName: OFFICIAL_RESULTS_USER_NAME,
			userId: OFFICIAL_RESULTS_USER_ID,
			userBetsMap: officialResults,
		});
	}

	static createQualifyingResults(qualifyingResultsStandings) {
		return new UserBetsResult({
			userName: QUALIFICATION_RESULTS_USER_NAME,
			userId: QUALIFICATION_RESULTS_USER_ID,
			userBetsMap: qualifyingResultsStandings,
		});
	}
}

export default UserBetsResult;
