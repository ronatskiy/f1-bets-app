import { computed } from "mobx";

import RaceInformation from "../models/race-information";

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
		const { racesResults } = this._appViewModel.formulaOneOfficial;
		return this._appViewModel.races.map(
			(race, index) =>
				new RaceInformation({
					race,
					racers: index < racesResults.length ? racesResults[index].racersStandings : undefined,
				}),
		);
	}
}

export default ResultsPageStore;
