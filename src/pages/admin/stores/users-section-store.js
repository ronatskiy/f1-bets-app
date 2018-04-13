import { observable, action, computed } from "mobx";

export default class UsersSectionStore {
	/**
	 * @param {AppViewModel} viewModel
	 * @param {string} USER_STORE_URL
	 */
	constructor(viewModel, USER_STORE_URL) {
		this._appViewModel = viewModel;
		this._storeApiUrl = USER_STORE_URL;

		this._appViewModel.users.fetchUsers();
	}

	@observable isUserFormVisible = false;
	@observable userForEdit = null;

	/**
	 * @return {User[]}
	 */
	@computed
	get users() {
		return this._appViewModel.users.users;
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

		return this._appViewModel.worker.operationWithProgressAsync(async () => {
			await this._appViewModel.users.addOrUpdate(user);

			this.userForEdit = null;
			this.toggleUserForm(false);

			return await this._appViewModel.users.fetchUsers();
		});
	}

	async deleteUser(id) {
		if (window.confirm("Вы точно хотите удалить пользователя?")) {
			await this._appViewModel.users.deleteUser(id);
		}

		return await this._appViewModel.users.fetchUsers();
	}

	showRaceResultsPanel() {
		this.isRaceResultsPanelVisible = true;
	}

	// async addOrUpdateRaceResults(js) {
	// 	if (!this.selectedRace) {
	// 		window.alert("Выберите гонку!");
	// 		return;
	// 	}
	//
	// 	if (Object.values(js).filter(racer => Boolean(racer)).length < 10) {
	// 		window.alert("Не все гоншики выбраны!");
	// 		return;
	// 	}
	//
	// 	this._rootStore.operationWithProgressAsync(() => {
	// 		this._raceInfoService.addOrUpdateRaceResult(this.selectedRace.id, js);
	// 		this.isRaceResultsPanelVisible = false;
	// 	});
	// }
}
