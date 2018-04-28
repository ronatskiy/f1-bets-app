import Race from "../race";
import SeasonInfo from "../season-info";

/**
 * @class RaceTable
 * @extends SeasonInfo
 */
export default class RaceTable extends SeasonInfo {
	/**
	 * @param {Object} options
	 * @param {string} options.season
	 * @param {ErgastApi~Race[]} options.Races
	 */
	constructor(options) {
		super(options);
		this.races = options.Races.map(r => new Race(r));
	}
}
