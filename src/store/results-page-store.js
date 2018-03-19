import { computed } from "mobx";

class ResultsPageSrore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@computed
	get bets() {
		return (this.rootStore.racesStore.nextRace && this.rootStore.racesStore.nextRace.bets) || [];
	}

	@computed
	get currentUser() {
		return this.rootStore.sessionStore.currentUser;
	}

	@computed
	get nextRaceTitle() {
		return (this.rootStore.racesStore.nextRace && this.rootStore.racesStore.nextRace.prettyTitle) || "";
	}
}

export default ResultsPageSrore;
