import Race from "../race";
import SeasonInfo from "../season-info";

/**
 * @name RaceTable
 * @memberOf ErgastApi
 * @extends ErgastApi.SeasonInfo
 * @property {ErgastApi.Race[]} races
 */
export default class RaceTable extends SeasonInfo {
	/**
	 * @param {Object} options
	 * @param {string} options.season
	 * @param {ErgastApi~RaceRawData[]} options.Races
	 */
	constructor(options) {
		super(options);
		this.races = options.Races.map(r => new Race(r));
	}
}
