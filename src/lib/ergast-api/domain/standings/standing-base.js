/**
 * @property {string} position
 * @property {string} positionText
 * @property {string} points
 * @property {string} wins
 */
export default class StandingBase {
	constructor({ position, positionText, points, wins }) {
		this.position = position;
		this.positionText = positionText;
		this.points = points;
		this.wins = wins;
	}
}
