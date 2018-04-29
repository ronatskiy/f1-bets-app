/**
 * @memberOf ErgastApi
 * @property {string} driverId
 * @property {string} permanentNumber
 * @property {string} code
 * @property {string} url
 * @property {string} givenName
 * @property {string} familyName
 * @property {string} dateOfBirth
 * @property {string} nationality
 */
export default class Driver {
	/**
	 * @param {ErgastApi~DriverRawData} options
	 */
	constructor({ driverId, url, permanentNumber, givenName, familyName, dateOfBirth, code, nationality }) {
		this.driverId = driverId;
		this.url = url;
		this.permanentNumber = permanentNumber;
		this.givenName = givenName;
		this.familyName = familyName;
		this.dateOfBirth = dateOfBirth;
		this.code = code;
		this.nationality = nationality;
	}
}

/**
 * @typedef {Object} ErgastApi~DriverRawData
 * @property {string} driverId
 * @property {string} url
 * @property {string} permanentNumber
 * @property {string} givenName
 * @property {string} familyName
 * @property {string} dateOfBirth
 * @property {string} code
 * @property {string} nationality
 */
