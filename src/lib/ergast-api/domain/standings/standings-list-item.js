import SeasonInfo from "../season-info";

/**
 * @property {string} season
 * @property {string} round
 */
export default class StandingsListItem extends SeasonInfo {
	/**
	 * @param {string} season
	 * @param {string} round
	 */
	constructor({ season, round }) {
		super({ season });
		this.round = round;
	}
}
