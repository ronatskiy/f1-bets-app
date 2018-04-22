class AppStore {
	/**
	 * @param {AppViewModel} viewModel
	 */
	constructor(viewModel) {
		this._appViewModel = viewModel;
	}

	get isProduction() {
		return this._appViewModel.isProduction;
	}

	get currentTime() {
		return this._appViewModel.timeWatcher.currentTime;
	}

	get isBetsAllowed() {
		return this._appViewModel.isBetsAllowed;
	}

	get hasPendingTasks() {
		return this._appViewModel.operationManager.hasPendingTasks;
	}

	get authenticatedUser() {
		return this._appViewModel.session.authenticatedUser;
	}

	get isUserAuthenticated() {
		return this._appViewModel.isUserAuthenticated;
	}

	get isUserAdmin() {
		return this._appViewModel.isUserAdmin;
	}

	startTimeWatcher() {
		this._appViewModel.timeWatcher.start();
	}

	stopTimeWatcher() {
		this._appViewModel.timeWatcher.stop();
	}
}

export default AppStore;
