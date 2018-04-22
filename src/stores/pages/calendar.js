import { computed } from "mobx";

class CalendarPageStore {
	/**
	 * @param {AppViewModel} viewModel
	 */
	constructor(viewModel) {
		this._appViewModel = viewModel;
	}

	get races() {
		return this._appViewModel.races;
	}

	get nextRace() {
		return this._appViewModel.nextRace;
	}

	@computed
	get isRaceWeekend() {
		return !this._appViewModel.isBetsAllowed;
	}
}

export default CalendarPageStore;