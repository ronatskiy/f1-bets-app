import BetScore from "../bet-score";

/**
 * @param betMap
 * @param {number} length
 * @return {string[]}
 */
function convertToArray(betMap, length = 10) {
	return Array(length)
		.fill(null)
		.map((_, index) => (betMap[index + 1] ? betMap[index + 1] : ""));
}

/**
 * @param {Object} userBetsMap
 * @param {Object} officialResultsBetsMap
 * @return {BetScore}
 */
export default function calcScore(userBetsMap, officialResultsBetsMap = null) {
	const betScore = new BetScore();
	if (!officialResultsBetsMap) {
		return betScore;
	}

	const usersVoteRacers = convertToArray(userBetsMap);
	const officialResultsRacers = Object.values(officialResultsBetsMap);

	return calculateScore(usersVoteRacers, officialResultsRacers);
}

/**
 * @param {string[]} usersVoteRacers
 * @param {string[]} officialResultsRacers
 * @return {BetScore}
 */
export function calculateScore(usersVoteRacers, officialResultsRacers) {
	const betScore = new BetScore();
	const firstTen = officialResultsRacers.slice(0, 10);

	usersVoteRacers.forEach((usersVoteRacerCode, racerPredictedPos) => {
		if (!usersVoteRacerCode) {
			betScore.add(0);
			return;
		}
		const racerFinishedPos = officialResultsRacers.findIndex(racerCode => racerCode === usersVoteRacerCode);
		const divergence = Math.abs(racerFinishedPos - racerPredictedPos);
		const isInFirstTen = firstTen.some(racerCode => racerCode === usersVoteRacerCode);
		const score = divergence < 5 ? 10 - divergence * 2 : isInFirstTen ? 2 : 0;

		betScore.add(score);
	});

	return betScore;
}
