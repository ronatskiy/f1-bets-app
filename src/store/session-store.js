import { computed, observable, action } from "mobx";
import { User, UserRepository } from "../storage";

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
	constructor(rootStore) {
		this.rootStore = rootStore;
		this._tryToFindUser();
	}

	@observable currentUser = null;

	@computed
	get isAuthenticated() {
		return this.currentUser !== null;
	}

	@computed
	get isCurrentUserAdmin() {
		return this.currentUser !== null ? this.currentUser.isAdmin : false;
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
			return true;
		}

		return false;
	}

	@action
	signOut() {
		if (this.isAuthenticated) {
			window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
			this.currentUser = null;
		}
	}

	@action
	async signIn({ login, password, name }) {
		const newUser = new User({
			login,
			name,
			password: encodePassword(password),
		});

		if (this._findUser(newUser)) {
			return "Пользователь с таким логином уже зарегистрирован.";
		}

		try {
			await UserRepository.addOrUpdate(newUser);
		} catch (error) {
			return "Server Error";
		}

		await this.rootStore.userStore.fetchUsers();

		return this._authenticate(newUser);
	}

	_findUser({ login }) {
		return this.rootStore.userStore.users.find(dbUser => dbUser.login === login);
	}

	@action
	login({ login, password }) {
		if (!this._findUser({ login })) {
			return "Пользователя с таким логином или паролем нет в системе.";
		}

		const dbUser = this.rootStore.userStore.users.find(
			dbUser => dbUser.login === login && dbUser.password === encodePassword(password),
		);

		if (dbUser) {
			return this._authenticate(dbUser);
		} else {
			return "Не верный пароль.";
		}
	}
}

export default SessionStore;
