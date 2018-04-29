/**
 * @memberOf ErgastApi
 * @property {string} rank
 * @property {string} lap
 * @property {ErgastApi~Time} time
 * @property {{ units: {string}, speed: {string} }} averageSpeed
 */
export default class FastestLap {
	/**
	 * @param {Object} options
	 * @param {string} options.rank
	 * @param {string} options.lap
	 * @param {ErgastApi~Time} options.Time
	 * @param {{ units: {string}, speed: {string} }} options.AverageSpeed
	 */
	constructor(options) {
		this.rank = options.rank;
		this.lap = options.lap;
		this.time = options.Time;
		this.averageSpeed = options.AverageSpeed;
	}
}

/**
 * @typedef {Object} ErgastApi~Time
 * @property {?string} millis
 * @property {time} time
 */
