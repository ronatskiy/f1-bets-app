import UserInfo from "./user-info";
import generateId from "../generate-id";

export default class User {
	constructor({ login, name, password, id, isAdmin = false }) {
		this.login = login;
		this.name = name;
		this.password = password;
		this.id = id || generateId();
		this.isAdmin = isAdmin;
	}

	toUserInfo() {
		return new UserInfo(this);
	}

	static fromJs({ login, name, password, id, isAdmin = false }) {
		return new User({ login, name, password, id, isAdmin });
	}
}
