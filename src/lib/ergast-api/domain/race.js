import Circuit from "./circuit";
import SeasonInfo from "./season-info";
import { QualifyingResult } from "./qualifying-result";

/**
 * @name Race
 * @memberOf ErgastApi
 * @extends ErgastApi.SeasonInfo
 * @property {string} round
 * @property {string} url
 * @property {string} raceName
 * @property {string} date
 * @property {string} time
 * @property {ErgastApi.Circuit} circuit
 */
export default class Race extends SeasonInfo {
	/**
	 * @param {ErgastApi~RaceRawData} options
	 */
	constructor(options) {
		super(options);
		this.round = options.round;
		this.url = options.url;
		this.raceName = options.raceName;
		this.date = options.date;
		this.time = options.time;
		this.circuit = new Circuit(options.Circuit);
		this.qualifyingResults = (options.QualifyingResults || []).map(
			qualifyingResults => new QualifyingResult(qualifyingResults),
		);
	}
}

/**
 * @typedef {Object} ErgastApi~RaceRawData
 * @property {string} season
 * @property {string} round
 * @property {string} url
 * @property {string} raceName
 * @property {string} date
 * @property {string} time
 * @property {ErgastApi~CircuitRawData} Circuit
 * @property {ErgastApi~QualifyingResult[]} QualifyingResults
 */
