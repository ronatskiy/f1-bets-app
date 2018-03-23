import { observable } from "mobx";

import UserStore from "./user-store";
import RacesStore from "./races-store";
import SessionStore from "./session-store";
import RacerStore from "./racer-store";
import TeamsStore from "./teams-store";
import ResultsPageSrore from "./results-page-store";
import LoginFormStore from "./login-form-store";
import { loginFormSettings, registerNewAccountFormSettings } from "./settings/login-form";
import AppStore from "./app-store";

class RootStore {
	constructor() {
		this.sessionStore = new SessionStore(this);
		this.userStore = new UserStore(this);
		this.racesStore = new RacesStore(this);
		this.racerStore = new RacerStore(this);
		this.teamsStore = new TeamsStore(this);
		this.resultsPageSrore = new ResultsPageSrore(this);
		this.loginFormStore = new LoginFormStore(this, loginFormSettings, async form => {
			const result = await this.sessionStore.login(form.values());

			if (result !== true) {
				alert(result);
				return;
			}
			form.clear();
		});
		this.registerNewAccountFormStore = new LoginFormStore(this, registerNewAccountFormSettings, async form => {
			const result = await this.sessionStore.signIn(form.values());
			if (result !== true) {
				alert(result);
				return;
			}
			form.clear();
		});
		this.appStore = new AppStore(this);
	}

	@observable pendingTasksCount = 0;
}

export default RootStore;
