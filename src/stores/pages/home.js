import { computed } from "mobx";

export default class HomePageStore {
	/**
	 * @param {AppViewModel} viewModel
	 */
	constructor(viewModel) {
		this._appViewModel = viewModel;
	}

	@computed
	get nextRace() {
		return this._appViewModel.nextRace;
	}
	@computed
	get isUserAlreadyBet() {
		return this._appViewModel.isUserAlreadyBet;
	}
	@computed
	get isBetsAllowed() {
		return this._appViewModel.isBetsAllowed;
	}
}
