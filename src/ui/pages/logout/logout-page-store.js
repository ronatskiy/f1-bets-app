export default class LogoutPageStore {
	/**
	 * @param {AppModel} appModel
	 */
	constructor(appModel) {
		this._appModel = appModel;
	}

	get isUserAuthenticated() {
		return this._appModel.session.isAuthenticated;
	}

	logout() {
		return this._appModel.session.logout();
	}
}
