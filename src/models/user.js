import { observable, computed, action, runInAction } from "mobx";

export default class UsersModel {
	/**
	 * @param {UserService} userService
	 * @param {SessionModel} sessionModel
	 * @param {OperationManager} operationManager
	 */
	constructor({ userService, sessionModel, operationManager }) {
		this._userService = userService;
		this._operationManager = operationManager;
		this._session = sessionModel;

		this._operationManager.runWithProgressAsync(() => this.fetchUsers());
	}

	@observable users = [];

	@computed
	get currentUser() {
		return this._session.authenticatedUser;
	}

	@action
	fetchUsers() {
		try {
			return this._operationManager.runWithProgressAsync(
				runInAction(async () => {
					return (this.users = await this._userService.fetchAll());
				}),
			);
		} catch (error) {
			console.log("Can't load 'users' in UserModel!!\n", error);
		}
	}

	async deleteUser(id) {
		await this._userService.delete(id);
		await this._loadUsers();
	}

	@action
	async addOrUpdate(user) {
		if (!user) {
			return;
		}

		return this._operationManager.runWithProgressAsync(async () => {
			return await this._userService.addOrUpdate(user);
		});
	}
}
