import { observable, runInAction } from "mobx";

export default class UsersModel {
	/**
	 * @param {UserService} userService
	 * @param {OperationManager} operationManager
	 * @param cryptoService
	 */
	constructor({ userService, operationManager, cryptoService }) {
		this._userService = userService;
		this._operationManager = operationManager;
		this._cryptoService = cryptoService;

		this._operationManager.runWithProgressAsync(() => this.fetchUsers());
	}

	/**
	 * @type {User[]}
	 */
	@observable users = [];

	fetchUsers() {
		try {
			return this._operationManager.runWithProgressAsync(async () => {
				const users = await this._userService.fetchAll();

				runInAction(async () => {
					this.users = users;
				});
			});
		} catch (error) {
			console.log("Can't load 'users' in UserModel!!\n", error);
		}
	}

	async deleteUser(id) {
		await this._userService.delete(id);
		await this.fetchUsers();
	}

	/**
	 * @param {User} user
	 * @return {Promise<*|undefined>}
	 */
	async addOrUpdate(user) {
		if (!user) {
			return;
		}

		return this._operationManager.runWithProgressAsync(async () => {
			await this._userService.addOrUpdate(user);
			return await this.fetchUsers();
		});
	}

	async resetPassword(id, newPassword) {
		await this.fetchUsers();

		const user = this._findUserById(id);

		if (!user) {
			return;
		}

		user.password = this._cryptoService.encodePassword(newPassword);
		await this.addOrUpdate(user);
	}

	/**
	 * @param userId
	 * @return {string}
	 */
	getUserNameById(userId) {
		const user = this._findUserById(userId);

		return user ? user.name : "<DELETED USER>";
	}

	/**
	 * @param userId
	 * @return {User|null}
	 */
	_findUserById(userId) {
		return this.users.find(u => u.id === userId) || null;
	}
}
