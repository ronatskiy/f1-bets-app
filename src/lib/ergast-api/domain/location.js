/**
 * @name Location
 * @memberOf ErgastApi
 * @property {string} locality
 * @property {string} country
 * @property {string} lat
 * @property {string} long
 * @property {string} alt
 */
export default class Location {
	/**
	 * @param {ErgastApi~LocationRawData} options
	 */
	constructor(options) {
		const { locality, country, lat, long, alt } = options;

		this.locality = locality;
		this.country = country;
		this.lat = lat;
		this.long = long;
		this.alt = alt;
	}
}

/**
 * @typedef {Object} ErgastApi~LocationRawData
 * @property {string} locality
 * @property {string} country
 * @property {string} lat
 * @property {string} long
 * @property {string} alt
 */
