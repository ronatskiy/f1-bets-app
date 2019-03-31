import { RacesSectionStore } from "./races-section";
import UsersSectionStore from "./users-section/stores/users-section-store";
import configProvider from "../../../config/config";

class AdminPageStore {
	/**
	 * @param {AppModel} appModel
	 * @param {RacesInfoService} racesInfoService
	 */
	constructor(appModel, racesInfoService) {
		const RACE_STORE_URL = configProvider.getRaceStoreApiUrl();
		const USER_STORE_URL = configProvider.getUserStoreApiUrl();

		this._racesSectionStore = new RacesSectionStore(appModel, RACE_STORE_URL, racesInfoService);
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
