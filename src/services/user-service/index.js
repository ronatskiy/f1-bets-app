import { fetchData, updateData } from "../web-api";
import User from "../../domain/user";

/**
 * @class UserService
 */
export default class UserService {
	/**
	 * @param {Object} options
	 * @param {string} options.userStoreApiUrl
	 */
	constructor({ userStoreApiUrl }) {
		this._apiUrl = userStoreApiUrl;
	}

	/**
	 * @return {Promise<User[]>}
	 */
	async fetchAll() {
		return (await fetchData(this._apiUrl)).map(User.fromJs);
	}

	/**
	 * @param {string} id
	 * @return {Promise<User>}
	 */
	async getById(id) {
		const user = (await this.fetchAll()).find(u => u.id === id);

		if (!user) {
			throw new Error("User cann't be found!");
		}

		return user;
	}

	/**
	 * @param {string} id
	 * @return {Promise<User | null>}
	 */
	async findById(id) {
		return this.findBy(u => u.id === id);
	}

	/**
	 * @param {Function} predicate
	 * @return {Promise<User | null>}
	 */
	async findBy(predicate) {
		const user = (await this.fetchAll()).find(predicate);

		if (!user) {
			return null;
		}

		return user;
	}

	/**
	 * @param {User[]} user
	 * @return {Promise<*>}
	 */
	async addOrUpdate(user) {
		if (!(user instanceof User)) {
			throw new Error("variable user must be instanceof class User");
		}

		const users = await this.fetchAll();

		const userIndex = users.findIndex(({ id }) => id === user.id);
		if (userIndex > -1) {
			users[userIndex] = user;
		} else {
			users.push(user);
		}

		return updateData(this._apiUrl, users);
	}

	async delete(id) {
		if (!id) {
			return;
		}
		const users = await this.fetchAll();

		return updateData(this._apiUrl, users.filter(user => user.id !== id));
	}
}
