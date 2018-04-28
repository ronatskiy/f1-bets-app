import SeasonInfo from "../season-info";

/**
 * @class StandingsTable
 * @extends SeasonInfo
 * @property {array} standingsLists
 */
export default class StandingsTable extends SeasonInfo {
	/**
	 * @param {Object} options
	 * @param {string} options.season
	 * @param {array} options.StandingsLists
	 */
	constructor(options) {
		super(options);
		this.standingsLists = options.StandingsLists.map(item => item);
	}
}
