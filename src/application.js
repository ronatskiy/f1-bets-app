import { createStores } from "./ui/stores";
import { createServices } from "./services/index";
import AppModel from "./models/app-model";

export default class Application {
	constructor({ configProvider }) {
		const services = createServices(configProvider);
		const appModel = new AppModel(services);

		this._stores = createStores(appModel);
	}

	getStores() {
		return this._stores;
	}
}
