import { createStores } from "./stores/index";
import { createServices } from "./services/index";
import AppViewModel from "./models/app-view-model";

export default class Application {
	constructor({ configProvider }) {
		this._isProductionMode = configProvider.isProductionMode();
		this._services = createServices(configProvider);
		this._appModel = new AppViewModel(this._services, configProvider);
		this._stores = createStores(this._appModel);
	}

	getStores() {
		return this._stores;
	}
}
