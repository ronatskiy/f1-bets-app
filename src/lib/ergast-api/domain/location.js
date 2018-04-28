/**
 * @typedef {Object} ErgastApi~Location
 * @property {string} locality
 * @property {string} country
 * @property {number} lat
 * @property {number} long
 * @property {number} alt
 */
class Location {
	/**
	 * @param {string} locality
	 * @param {string} country
	 * @param {number} lat
	 * @param {number} long
	 * @param {number} alt
	 */
	constructor({ locality, country, lat, long, alt }) {
		this.locality = locality;
		this.country = country;
		this.lat = lat;
		this.long = long;
		this.alt = alt;
	}
}

export default Location;
