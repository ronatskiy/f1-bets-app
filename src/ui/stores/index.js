import AppStore from "./app";
import HeaderStore from "./header";
import DevToolsStore from "./dev-tools-store";
import { createPagesStores } from "./pages";

/**
 * @param {AppModel} appModel
 * @return {{homePageStore, racerStandingsPageStore, teamsStandingsPageStore, adminPageStore, loginPageStore, logoutPageStore, appStore: AppStore}}
 */
export function createStores(appModel) {
	const appStore = new AppStore(appModel);
	const headerStore = new HeaderStore(appModel);
	const devToolsStore = new DevToolsStore(appModel);
	const pagesStores = createPagesStores(appModel);

	return {
		...pagesStores,
		appStore,
		headerStore,
		devToolsStore,
	};
}
