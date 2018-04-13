import { computed } from "mobx";

export default class UserBetsHistoryPageStore {
	/**
	 * @param {AppViewModel} viewModel
	 */
	constructor(viewModel) {
		this._appViewModel = viewModel;
	}

	@computed
	get userBets() {
		return this._appViewModel.authUserBets;
	}
}
