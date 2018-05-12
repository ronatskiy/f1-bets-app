import { observable, action, computed } from "mobx";

export default class UsersSectionStore {
	/**
	 * @param {AppViewModel} viewModel
	 * @param {string} USER_STORE_URL
	 */
	constructor(viewModel, USER_STORE_URL) {
		this._appViewModel = viewModel;
		this._storeApiUrl = USER_STORE_URL;

		this._appViewModel.usersModel.fetchUsers();
	}

	@observable isUserFormVisible = false;
	@observable userForEdit = null;

	/**
	 * @return {User[]}
	 */
	@computed
	get users() {
		return this._appViewModel.usersModel.users;
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

		return this._appViewModel.operationManager.runWithProgressAsync(async () => {
			await this._appViewModel.usersModel.addOrUpdate(user);

			this.userForEdit = null;
			this.toggleUserForm(false);

			return await this._appViewModel.usersModel.fetchUsers();
		});
	}

	deleteUser = async id => {
		if (window.confirm("Вы точно хотите удалить пользователя?")) {
			await this._appViewModel.usersModel.deleteUser(id);
		}

		return await this._appViewModel.usersModel.fetchUsers();
	};
}
