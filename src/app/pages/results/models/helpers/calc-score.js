import { calcPointsForGuessedBet } from "./calc-points-for-guessed-bet";
import BetScore from "../bet-score";

/**
 * @param {BetInfo} userBetInfo
 * @param {?UserBetsResult} officialResults
 * @return {BetScore}
 */
export function calcScore(userBetInfo, officialResults = null) {
	const betScore = new BetScore();
	if (!officialResults) {
		return betScore;
	}

	const officialResultsRacers = Object.values(officialResults.betInfo.betsMap);

	for (let officialRacerPos = 1; officialRacerPos <= 10; officialRacerPos++) {
		const userBetRacerCode = userBetInfo.betsMap[officialRacerPos];

		if (!userBetRacerCode) {
			betScore.add(0);
			continue;
		}

		const predicate = code => code === userBetRacerCode;

		if (officialResultsRacers.some(predicate)) {
			const userBetRacerPos = officialResultsRacers.findIndex(predicate) + 1;

			betScore.add(calcPointsForGuessedBet(officialRacerPos, userBetRacerPos));
		} else {
			betScore.add(0);
		}
	}

	return betScore;
}
