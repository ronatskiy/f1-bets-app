import { computed } from "mobx";

export default class LogoutPageStore {
	/**
	 * @param {AppViewModel} viewModel
	 */
	constructor(viewModel) {
		this._appViewModel = viewModel;
	}

	@computed
	get isUserAuthenticated() {
		return this._appViewModel.session.isAuthenticated;
	}

	logout() {
		return this._appViewModel.session.logout();
	}
}
