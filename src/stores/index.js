import AppStore from "./app";
import { createPagesStores } from "./pages";

/**
 * @param {AppViewModel} appModel
 * @return {{homePageStore, racerStandingsPageStore, teamsStandingsPageStore, adminPageStore, loginPageStore, logoutPageStore, appStore: AppStore}}
 */
export function createStores(appModel) {
	const pagesStores = createPagesStores(appModel);
	const appStore = new AppStore(appModel);

	return {
		...pagesStores,
		appStore,
	};
}
