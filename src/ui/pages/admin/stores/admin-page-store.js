import RacesSectionStore from "./races-section-store";
import UsersSectionStore from "./users-section-store";
import configProvider from "../../../../config/config";

class AdminPageStore {
	/**
	 * @param {AppModel} appModel
	 */
	constructor(appModel) {
		const RACE_STORE_URL = configProvider.getRaceStoreApiUrl();
		const USER_STORE_URL = configProvider.getUserStoreApiUrl();

		this._racesSectionStore = new RacesSectionStore(appModel, RACE_STORE_URL);
		this._usersSectionStore = new UsersSectionStore(appModel, USER_STORE_URL);
	}

	get racesSectionStore() {
		return this._racesSectionStore;
	}

	get usersSectionStore() {
		return this._usersSectionStore;
	}
}

export default AdminPageStore;
