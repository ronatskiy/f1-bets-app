import { IS_PRODUCTION_MODE } from "../config/config";

class AppStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this._isProductionMode = IS_PRODUCTION_MODE;
	}

	get isProduction() {
		return this._isProductionMode;
	}
}

export default AppStore;
