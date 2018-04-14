import { computed } from "mobx";

import RaceInformation from "../../pages/results/models/race-information";

class ResultsPageStore {
	/**
	 * @param {AppViewModel} viewModel
	 */
	constructor(viewModel) {
		this._appViewModel = viewModel;
	}

	@computed
	get authenticatedUser() {
		return this._appViewModel.session.authenticatedUser;
	}

	@computed
	get raceResultsWithBets() {
		return this._appViewModel.races.map(race => new RaceInformation({ race }));
	}
}

export default ResultsPageStore;
