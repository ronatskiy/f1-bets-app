export default class UserBetsHistoryPageStore {
	/**
	 * @param {AppModel} appModel
	 */
	constructor(appModel) {
		this._appModel = appModel;
	}

	get userBets() {
		return this._appModel.authUserBets;
	}
}
