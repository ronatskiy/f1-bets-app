import RaceWithResults from "../race-with-results";
import RaceTable from "./race-table";

/**
 * @name RaceTableExtended
 * @memberOf ErgastApi
 * @extends ErgastApi.RaceTable
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
		this.races = options.Races.map(r => new RaceWithResults(r));
	}
}
