import Race from "./race";
import RaceResults from "./race-results";

/**
 * @name RaceWithResults
 * @memberOf ErgastApi
 * @extends ErgastApi.Race
 * @property {ErgastApi.RaceResults[]} raceResults
 */
export default class RaceWithResults extends Race {
	/**
	 * @param {ErgastApi~RaceWithResultsRawData} options
	 */
	constructor(options) {
		super(options);
		this.results = options.Results.map(res => new RaceResults(res));
	}
}

/**
 * @typedef {ErgastApi~RaceRawData} ErgastApi~RaceWithResultsRawData
 * @property {ErgastApi~RaceResultsRawData[]} Results
 */
