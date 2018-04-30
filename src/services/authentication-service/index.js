import User from "../../domain/user";

export default class AuthenticationService {
	constructor({ localStorageUserKey, userService, cryptoService }) {
		this._localStorageUserKey = localStorageUserKey;
		this._userService = userService;
		this._cryptoService = cryptoService;
	}

	/**
	 * @param {?User} user
	 * @return {Promise<?User>}
	 */
	async authenticate(user = null) {
		let userId = null;

		if (!user) {
			userId = window.localStorage.getItem(this._localStorageUserKey);
			if (!userId) {
				return null;
			}
		} else {
			userId = user.id;
		}

		const currentUser = await this._userService.findById(userId);
		if (currentUser) {
			this._authenticate(currentUser);

			return currentUser;
		}

		return null;
	}

	/**
	 * @param {string} login
	 * @param {string} password
	 * @return {Promise<string | boolean>}
	 */
	async login({ login, password }) {
		const user = await this._userService.findBy(u => u.login === login);
		if (!user) {
			return "Пользователя с таким логином или паролем нет в системе.";
		}

		if (this._cryptoService.isPasswordValid(password, user.password)) {
			if (this._authenticate(user)) {
				return user;
			}
			return false;
		}

		return "Не верный пароль.";
	}

	logout() {
		window.localStorage.removeItem(this._localStorageUserKey);
	}

	/**
	 * @param {!string} login
	 * @param {!string} name
	 * @param {!string} password
	 * @return {Promise<string | boolean>}
	 */
	async signIn({ login, name, password }) {
		const newUser = new User({
			login,
			name,
			password: this._cryptoService.encodePassword(password),
		});

		const user = await this._userService.findBy(u => u.login === newUser.login);

		if (user) {
			return "Пользователь с таким логином уже зарегистрирован.";
		}

		try {
			await this._userService.addOrUpdate(newUser);
		} catch (error) {
			return "Server Error. Cannot add or update user";
		}

		if (this._authenticate(newUser)) {
			return newUser;
		}

		return false;
	}

	/**
	 * @param {!User} user
	 * @return {boolean}
	 * @private
	 */
	_authenticate({ id }) {
		if (id) {
			window.localStorage.setItem(this._localStorageUserKey, id);

			return true;
		}

		return false;
	}
}
