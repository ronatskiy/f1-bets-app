/**
 * @typedef SeasonInfo
 * @property {string} season
 */
export default class SeasonInfo {
	/**
	 * @param {Object} options
	 * @param {string} options.season
	 */
	constructor({ season }) {
		this.season = season;
	}
}
