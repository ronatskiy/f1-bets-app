import AppStore from "./app";
import HeaderStore from "./header";
import { createPagesStores } from "./pages";

/**
 * @param {AppModel} appModel
 * @return {{homePageStore, racerStandingsPageStore, teamsStandingsPageStore, adminPageStore, loginPageStore, logoutPageStore, appStore: AppStore}}
 */
export function createStores(appModel) {
	const appStore = new AppStore(appModel);
	const headerStore = new HeaderStore(appModel);
	const pagesStores = createPagesStores(appModel);

	return {
		...pagesStores,
		appStore,
		headerStore,
	};
}
