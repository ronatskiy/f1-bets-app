export default class LogoutPageStore {
	/**
	 * @param {AppViewModel} viewModel
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
