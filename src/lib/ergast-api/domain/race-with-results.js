import Race from "./race";
import RaceResults from "./race-results";

/**
 * @memberOf ErgastApi
 * @property {string} season
 * @property {string} round
 * @property {string} url
 * @property {string} raceName
 * @property {string} date
 * @property {string} time
 * @property {ErgastApi.Circuit} circuit
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
