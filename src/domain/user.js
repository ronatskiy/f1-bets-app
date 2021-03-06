import UserInfo from "./user-info";
import generateId from "../services/crypto-service/generate-id";

/**
 * @class User
 * @extends UserInfo
 * @property {!string} id
 * @property {!string} login
 * @property {!string} name
 * @property {!string} password
 * @property {boolean} isAdmin
 * @property {boolean} isTesting
 */
export default class User extends UserInfo {
	constructor({ login, name, password, id, isAdmin = false, isTesting = false }) {
		super({ name, id: id || generateId() });
		this.login = login;
		this.password = password;
		this.isAdmin = isAdmin;
		this.isTesting = isTesting;
	}

	toUserInfo() {
		return new UserInfo(this);
	}

	static fromJs({ login, name, password, id, isAdmin = false, isTesting = false }) {
		return new User({ login, name, password, id, isAdmin, isTesting });
	}
}
