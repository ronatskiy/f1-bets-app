/**
 * @class BetScore
 * @property {number} value
 * @property {string} tooltip
 */
class BetScore {
	_score = [];

	add(points = 0) {
		this._score.push(points);
	}

	get value() {
		return this._score.reduce((a, b) => a + b, 0);
	}

	get tooltip() {
		return this._score.join("-");
	}

	/**
	 * @param {number} index
	 * @return {number}
	 */
	getPointsAt(index) {
		return this._score[index];
	}
}

export default BetScore;
