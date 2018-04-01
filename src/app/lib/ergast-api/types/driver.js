/**
 * @typedef {Object} ErgastApi~Driver
 * @property {string} driverId
 * @property {string} permanentNumber
 * @property {string} code
 * @property {string} url
 * @property {string} givenName
 * @property {string} familyName
 * @property {string} dateOfBirth
 * @property {string} nationality
 */
class Driver {
	/**
	 * @param {string} driverId
	 * @param {string} url
	 * @param {string} permanentNumber
	 * @param {string} givenName
	 * @param {string} familyName
	 * @param {string} dateOfBirth
	 * @param {string} code
	 * @param {string} nationality
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

export default Driver;
