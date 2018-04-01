import LocationType from "./location";

/**
 * @typedef {Object} ErgastApi~Circuit
 * @property {string} circuitId
 * @property {string} url
 * @property {string} circuitName
 * @property {ErgastApi~Location} location
 */
class Circuit {
	/**
	 * @param {string} circuitId
	 * @param {string} url
	 * @param {ErgastApi~Location} Location
	 * @param {string} CircuitName
	 */
	constructor({ circuitId, url, Location, CircuitName }) {
		this.circuitId = circuitId;
		this.url = url;
		this.location = new LocationType(Location);
		this.circuitName = CircuitName;
	}
}

export default Circuit;
