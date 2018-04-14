export default class HeaderStore {
	/**
	 * @param {AppViewModel} viewModel
	 */
	constructor(viewModel) {
		this._appViewModel = viewModel;
	}

	get nextRace() {
		return this._appViewModel.nextRace;
	}

	get currentTimeUtcString() {
		return this._appViewModel.timeWatcher.currentTimeUtcString;
	}
}
