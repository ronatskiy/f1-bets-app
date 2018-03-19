import UserStore from "./user-store";
import RacesStore from "./races-store";
import SessionStore from "./session-store";
import RacerStore from "./racer-store";
import TeamsStore from "./teams-store";
import ResultsPageSrore from "./results-page-store";

class RootStore {
	constructor() {
		this.sessionStore = new SessionStore(this);
		this.userStore = new UserStore(this);
		this.racesStore = new RacesStore(this);
		this.racerStore = new RacerStore(this);
		this.teamsStore = new TeamsStore(this);
		this.resultsPageSrore = new ResultsPageSrore(this);
	}
}

export default RootStore;
