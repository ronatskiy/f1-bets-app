/**
 * @typedef {Object} ErgastApi~Location
 * @property {string} locality
 * @property {string} county
 * @property {number} lat
 * @property {number} long
 * @property {number} alt
 */
class Location {
	/**
	 * @param {string} Locality
	 * @param {string} Country
	 * @param {number} lat
	 * @param {number} long
	 * @param {number} alt
	 */
	constructor({ Locality, Country, lat, long, alt }) {
		this.locality = Locality;
		this.county = Country;
		this.lat = lat;
		this.long = long;
		this.alt = alt;
	}
}

export default Location;
