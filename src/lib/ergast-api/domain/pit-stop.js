/**
 * @name PitStop
 * @memberOf ErgastApi
 * @property {string} driverId
 * @property {number} stop
 * @property {number} lap
 * @property {string} time
 * @property {string} duration
 */
export default class PitStop {
	/**
	 * @param {Object} options
	 * @param {string} options.driverId
	 * @param {number} options.stop
	 * @param {number} options.lap
	 * @param {string} options.time
	 * @param {string} options.duration
	 */
	constructor({ driverId, stop, lap, time, duration }) {
		this.driverId = driverId;
		this.stop = stop;
		this.lap = lap;
		this.time = time;
		this.duration = duration;
	}
}
