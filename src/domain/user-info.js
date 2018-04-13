/**
 * @class UserInfo
 * @property {!string} id
 * @property {!string} name
 */

class UserInfo {
	/**
	 * @param {!string} name
	 * @param {!string} id
	 */
	constructor({ name, id }) {
		this.name = name;
		this.id = id;
	}
}

export default UserInfo;
