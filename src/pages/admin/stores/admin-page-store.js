import RacesSectionStore from "./races-section-store";
import UsersSectionStore from "./users-section-store";
import configProvider from "../../../config/config";

class AdminPageStore {
	/**
	 * @param {AppViewModel} viewModel
	 */
	constructor(viewModel) {
		const RACE_STORE_URL = configProvider.getRaceStoreApiUrl();
		const USER_STORE_URL = configProvider.getUserStoreApiUrl();
		this._racesSectionStore = new RacesSectionStore(viewModel, RACE_STORE_URL);
		this._usersSectionStore = new UsersSectionStore(viewModel, USER_STORE_URL);
	}

	get racesSectionStore() {
		return this._racesSectionStore;
	}

	get usersSectionStore() {
		return this._usersSectionStore;
	}
}

export default AdminPageStore;
