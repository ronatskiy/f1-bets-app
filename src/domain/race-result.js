/**
 * @name RaceResult
 * @property {string} season
 * @property {number} round
 * @property {Racer[]} racersStandings
 */
export default class RaceResult {
	/**
	 * @param {Object} options
	 * @param {string} options.season
	 * @param {string} options.round
	 * @param {Racer[]} options.racersStandings
	 */
	constructor({ season, round, racersStandings }) {
		this.season = season;
		this.round = Number(round);
		this.racersStandings = racersStandings;
	}
}
