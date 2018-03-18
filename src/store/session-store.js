import { computed, observable, action } from "mobx";
import { UserRepository } from "../storage";

export const LOCAL_STORAGE_USER_KEY = "f1betsappuserid";

function encodePassword(password) {
	// TODO: Add encoding
	return password;
}

// function decodePassword(encodedPassword) {
// 	// TODO: Add decode
// 	return encodedPassword;
// }

class SessionStore {
	@observable currentUser = null;
	@computed
	get isAuthenticated() {
		return this.currentUser !== null;
	}

	@computed
	get isCurrentUserAdmin() {
		return this.currentUser !== null ? this.currentUser.isAdmin : false;
	}

	constructor(rootStore) {
		this.rootStore = rootStore;
		this._tryToFindUser();
	}

	async _tryToFindUser() {
		const userId = window.localStorage.getItem(LOCAL_STORAGE_USER_KEY) || null;
		if (userId) {
			const currentUser = await UserRepository.getById(userId);
			if (currentUser) {
				this._authenticate(currentUser);
			}
		}
	}

	_authenticate(user) {
		if (user && user.id) {
			window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, user.id);
			this.currentUser = user;
		}
	}

	signOut() {
		if (this.isAuthenticated) {
			window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
			this.currentUser = null;
		}
	}

	async signIn(newUser) {
		if (this._findUser(newUser)) {
			return "Пользователь с таким логином уже зарегистрирован.";
		}
		newUser.password = encodePassword(newUser.password);
		try {
			await UserRepository.addOrUpdate(newUser);
		} catch (error) {
			return "Server Error";
		}

		await this.rootStore.userStore.fetchUsers();
		this._authenticate(newUser);
		return true;
	}

	_findUser({ login }) {
		const dbUser = this.rootStore.userStore.users.find(dbUser => dbUser.login === login);
		return dbUser;
	}

	@action
	login({ login, password }) {
		if (!this._findUser({ login })) {
			return "Пользователя с таким логином нет в системе.";
		}

		const dbUser = this.rootStore.userStore.users.find(
			dbUser => dbUser.login === login && dbUser.password === encodePassword(password),
		);

		if (dbUser) {
			this._authenticate(dbUser);
			return true;
		} else {
			return "Не верный пароль.";
		}
	}
}

export default SessionStore;
