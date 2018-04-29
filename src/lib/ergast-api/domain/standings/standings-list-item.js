import SeasonInfo from "../season-info";

/**
 * @memberOf ErgastApi
 * @extends ErgastApi.SeasonInfo
 * @property {string} round
 */
export default class StandingsListItem extends SeasonInfo {
	/**
	 * @param {Object} options
	 * @param {string} options.season
	 * @param {string} options.round
	 */
	constructor({ season, round }) {
		super({ season });
		this.round = round;
	}
}
