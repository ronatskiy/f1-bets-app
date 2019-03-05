class AppStore {
	/**
	 * @param {AppModel} appModel
	 */
	constructor(appModel) {
		this._appModel = appModel;
	}

	get isProduction() {
		return this._appModel.isProduction;
	}

	get currentTime() {
		return this._appModel.timeWatcher.currentTime;
	}

	get isBetsAllowed() {
		return this._appModel.isBetsAllowed;
	}

	get hasPendingTasks() {
		return this._appModel.operationManager.hasPendingTasks;
	}

	get authenticatedUser() {
		return this._appModel.session.authenticatedUser;
	}

	get isUserAuthenticated() {
		return this._appModel.isUserAuthenticated;
	}

	get isUserAlreadyBet() {
		return this._appModel.isUserAlreadyBet;
	}

	get isUserAdmin() {
		return this._appModel.isUserAdmin;
	}

	startTimeWatcher() {
		this._appModel.timeWatcher.start();
	}

	stopTimeWatcher() {
		this._appModel.timeWatcher.stop();
	}
}

export default AppStore;
