export default class HomePageStore {
	/**
	 * @param {AppViewModel} viewModel
	 */
	constructor(viewModel) {
		this._appViewModel = viewModel;
	}

	get nextRace() {
		return this._appViewModel.nextRace;
	}

	get isUserAlreadyBet() {
		return this._appViewModel.isUserAlreadyBet;
	}

	get isBetsAllowed() {
		return this._appViewModel.isBetsAllowed;
	}
}
