/**
 * @memberOf ErgastApi
 * @property {string} constructorId
 * @property {string} url
 * @property {string} name
 * @property {string} nationality
 */
export default class Constructor {
	/**
	 * @param {ErgastApi~ConstructorRawData} options
	 */
	constructor({ constructorId, url, name, nationality }) {
		this.constructorId = constructorId;
		this.url = url;
		this.name = name;
		this.nationality = nationality;
	}
}

/**
 * @typedef {Object} ErgastApi~ConstructorRawData
 * @property {string} constructorId
 * @property {string} url
 * @property {string} name
 * @property {string} nationality
 */
