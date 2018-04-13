import { calcScore } from "./helpers/calc-score";
import BetInfo from "../../../domain/bet-info";
import UserInfo from "../../../domain/user-info";

const OFFICIAL_RESULT_USER_TITLE = "Formula 1 (Official)";
export const OFFICIAL_RESULTS_USER_ID = "official-results";

/**
 * @class UserBetsResult
 * @property {BetScore} userScore
 */
class UserBetsResult {
	/**
	 * @param {BetInfo} betInfo
	 * @param {?UserBetsResult} officialResults
	 */
	constructor(betInfo, officialResults = null) {
		this.betInfo = betInfo;
		this.userScore = calcScore(betInfo, officialResults);
	}

	static createOfficialResults(officialResults) {
		return new UserBetsResult(
			new BetInfo({
				userInfo: new UserInfo({ name: OFFICIAL_RESULT_USER_TITLE, id: OFFICIAL_RESULTS_USER_ID }),
				betsMap: officialResults,
			}),
		);
	}
}

export default UserBetsResult;
