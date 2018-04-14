export default class UserBetsHistoryPageStore {
	/**
	 * @param {AppViewModel} viewModel
	 */
	constructor(viewModel) {
		this._appViewModel = viewModel;
	}

	get userBets() {
		return this._appViewModel.authUserBets;
	}
}
