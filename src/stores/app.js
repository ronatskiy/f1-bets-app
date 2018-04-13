import { computed } from "mobx";

class AppStore {
	/**
	 * @param {AppViewModel} viewModel
	 */
	constructor(viewModel) {
		this._appViewModel = viewModel;
	}

	@computed
	get currentTime() {
		return this._appViewModel.currentTime;
	}

	@computed
	get currentUser() {
		return this._appViewModel.currentUser;
	}

	@computed
	get hasPendingTasks() {
		return this._appViewModel.hasPendingTasks;
	}

	@computed
	get isBetsAllowed() {
		return this._appViewModel.isBetsAllowed;
	}

	@computed
	get isUserAuthenticated() {
		return this._appViewModel.isUserAuthenticated;
	}

	@computed
	get isUserAdmin() {
		return this._appViewModel.isUserAdmin;
	}

	get isProduction() {
		return this._appViewModel.isProduction;
	}

	startTimeWatcher() {
		this._appViewModel.startTimeWatcher();
	}

	stopTimeWatcher() {
		this._appViewModel.stopTimeWatcher();
	}

	login({ login, password }) {
		return this._appViewModel.login({ login, password });
	}

	logout() {
		return this._appViewModel.logout();
	}

	signIn({ name, login, password }) {
		return this._appViewModel.signIn({ name, login, password });
	}
}

export default AppStore;
