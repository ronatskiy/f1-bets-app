export default class HeaderStore {
	/**
	 * @param {AppModel} appModel
	 */
	constructor(appModel) {
		this._appModel = appModel;
	}

	get nextRace() {
		return this._appModel.nextRace;
	}

	get currentTimeUtcString() {
		return this._appModel.timeWatcher.currentTimeUtcString;
	}
}
