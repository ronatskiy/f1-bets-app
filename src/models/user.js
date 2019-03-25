import { observable, runInAction } from "mobx";

export default class UsersModel {
	/**
	 * @param {UserService} userService
	 * @param {OperationManager} operationManager
	 */
	constructor({ userService, operationManager }) {
		this._userService = userService;
		this._operationManager = operationManager;

		this._operationManager.runWithProgressAsync(() => this.fetchUsers());
	}

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

	async addOrUpdate(user) {
		if (!user) {
			return;
		}

		return this._operationManager.runWithProgressAsync(async () => {
			await this._userService.addOrUpdate(user);
			return await this.fetchUsers();
		});
	}
}
