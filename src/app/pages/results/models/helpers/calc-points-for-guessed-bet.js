/**
 * @param {number} userBetPos
 * @param {number} officialPos
 * @return {number}
 */
export function calcPointsForGuessedBet(userBetPos, officialPos) {
	let score = 0;

	if (userBetPos === officialPos) {
		score = userBetPos === 1 ? 25 : userBetPos === 2 ? 18 : userBetPos === 3 ? 15 : 10;
	} else if (userBetPos >= 1 && userBetPos <= 10) {
		score = 2;
	}

	return score;
}
