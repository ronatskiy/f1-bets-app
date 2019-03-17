export default class HeaderStore {
	/**
	 * @param {AppModel} appModel
	 */
	constructor(appModel) {
		this._appModel = appModel;
	}

	/**
	 * @return {Race | null}
	 */
	get nextRace() {
		return this._appModel.nextRace;
	}

	get currentTimeUtcString() {
		return this._appModel.timeWatcher.currentTimeUtcString;
	}
}
