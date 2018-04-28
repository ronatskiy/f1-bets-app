import Circuit from "./circuit";
import SeasonInfo from "./season-info";

/**
 * @typedef {Object} ErgastApi~Race
 * @property {string} season
 * @property {string} round
 * @property {string} url
 * @property {string} raceName
 * @property {string} date
 * @property {string} time
 * @property {ErgastApi~Circuit} circuit
 */
export default class Race extends SeasonInfo {
	/**
	 * @param {Object} options
	 * @param {string} options.round
	 * @param {string} options.url
	 * @param {string} options.raceName
	 * @param {string} options.date
	 * @param {string} options.time
	 * @param {ErgastApi~Circuit} options.Circuit
	 */
	constructor(options) {
		super(options);
		this.round = options.round;
		this.url = options.url;
		this.raceName = options.raceName;
		this.date = options.date;
		this.time = options.time;
		this.circuit = new Circuit(options.Circuit);
	}
}
