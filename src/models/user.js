import { observable, computed, action, runInAction } from "mobx";

export default class UsersModel {
	/**
	 * @param {UserService} userService
	 * @param {SessionModel} sessionModel
	 * @param {WorkerModel} worker
	 */
	constructor({ userService, sessionModel, worker }) {
		this._userService = userService;
		this._worker = worker;
		this._session = sessionModel;

		this._worker.operationWithProgressAsync(() => this.fetchUsers());
	}

	@observable users = [];

	@computed
	get currentUser() {
		return this._session.authenticatedUser;
	}

	@action
	fetchUsers() {
		try {
			return this._worker.operationWithProgressAsync(
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

		return this._worker.operationWithProgressAsync(async () => {
			return await this._userService.addOrUpdate(user);
		});
	}
}
