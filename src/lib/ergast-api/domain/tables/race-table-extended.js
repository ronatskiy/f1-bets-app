import Race from "../race-with-results";
import RaceTable from "./race-table";

/**
 * @memberOf ErgastApi
 * @extends RaceTable
 * @property {string} round
 */
export default class RaceTableExtended extends RaceTable {
	/**
	 * @param {Object} options
	 * @param {string} options.season
	 * @param {ErgastApi~RaceWithResultsRawData[]} options.Races
	 */
	constructor(options) {
		super(options);
		this.races = options.Races.map(r => new Race(r));
	}
}
