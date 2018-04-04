import { computed } from "mobx";

import RaceInformation from "../models/race-information";

class ResultsPageSrore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@computed
	get currentUser() {
		return this.rootStore.sessionStore.currentUser;
	}

	@computed
	get raceResultsWithBets() {
		return this.rootStore.racesStore.races.map(race => new RaceInformation({ race }));
	}
}

export default ResultsPageSrore;
