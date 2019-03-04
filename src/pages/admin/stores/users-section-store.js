import { observable, action, computed } from "mobx";

export default class UsersSectionStore {
	/**
	 * @param {AppModel} appModel
	 * @param {string} USER_STORE_URL
	 */
	constructor(appModel, USER_STORE_URL) {
		this._appModel = appModel;
		this._storeApiUrl = USER_STORE_URL;

		this._appModel.usersModel.fetchUsers();
	}

	@observable isUserFormVisible = false;
	@observable userForEdit = null;

	/**
	 * @return {User[]}
	 */
	@computed
	get users() {
		return this._appModel.usersModel.users;
	}

	get storeApiUrl() {
		return this._storeApiUrl;
	}

	@action
	toggleUserForm(visible) {
		this.isUserFormVisible = visible;
	}

	@action
	setUserForEdit(user) {
		this.userForEdit = user;
		this.toggleUserForm(true);
	}

	@action
	async addOrUpdate(user) {
		if (!user) {
			return;
		}

		return this._appModel.operationManager.runWithProgressAsync(async () => {
			await this._appModel.usersModel.addOrUpdate(user);

			this.userForEdit = null;
			this.toggleUserForm(false);

			return await this._appModel.usersModel.fetchUsers();
		});
	}

	deleteUser = async id => {
		if (window.confirm("Вы точно хотите удалить пользователя?")) {
			await this._appModel.usersModel.deleteUser(id);
		}

		return await this._appModel.usersModel.fetchUsers();
	};
}
