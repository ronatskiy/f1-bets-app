/**
 * @typedef {Object} ErgastApi~Constructor
 * @property {string} constructorId
 * @property {string} url
 * @property {string} name
 * @property {string} nationality
 */
class Constructor {
	/**
	 * @param {string} constructorId
	 * @param {string} url
	 * @param {string} name
	 * @param {string} nationality
	 */
	constructor({ constructorId, url, name, nationality }) {
		this.constructorId = constructorId;
		this.url = url;
		this.name = name;
		this.nationality = nationality;
	}
}

export default Constructor;
