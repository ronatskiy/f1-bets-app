import Location from "./location";

/**
 * @name Circuit
 * @memberOf ErgastApi
 * @property {string} circuitId
 * @property {string} url
 * @property {string} circuitName
 * @property {ErgastApi.Location} location
 */
export default class Circuit {
	/**
	 * @param {ErgastApi~CircuitRawData} options
	 */
	constructor(options) {
		const { circuitId, url, circuitName } = options;

		this.circuitId = circuitId;
		this.url = url;
		this.circuitName = circuitName;
		this.location = new Location(options.Location);
	}
}

/**
 * @typedef {Object} ErgastApi~CircuitRawData
 * @property {string} circuitId
 * @property {string} url
 * @property {string} circuitName
 * @property {ErgastApi~LocationRawData} Location
 */
