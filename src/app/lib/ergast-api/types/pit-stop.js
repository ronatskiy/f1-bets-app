/**
 * @typedef {Object} ErgastApi~PitStop
 * @property {string} driverId
 * @property {number} stop
 * @property {number} lap
 * @property {string} time
 * @property {string} duration
 */
class PitStop {
	/**
	 * @param {string} driverId
	 * @param {number} stop
	 * @param {number} lap
	 * @param {string} time
	 * @param {string} duration
	 */
	constructor({ driverId, stop, lap, time, duration }) {
		this.driverId = driverId;
		this.stop = stop;
		this.lap = lap;
		this.time = time;
		this.duration = duration;
	}
}

export default PitStop;
