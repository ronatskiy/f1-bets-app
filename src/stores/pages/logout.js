export default class LogoutPageStore {
	/**
	 * @param {AppModel} viewModel
	 */
	constructor(viewModel) {
		this._appViewModel = viewModel;
	}

	get isUserAuthenticated() {
		return this._appViewModel.session.isAuthenticated;
	}

	logout() {
		return this._appViewModel.session.logout();
	}
}
