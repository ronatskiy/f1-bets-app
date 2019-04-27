import User from "../../domain/user";

class DevToolsStore {
	/**
	 * @param {AppModel} appModel
	 */
	constructor(appModel) {
		this._appModel = appModel;
	}

	get currentUser() {
		return this._appModel.session.authenticatedUser;
	}

	makeUserAdmin() {
		const user = new User({
			...this.currentUser,
			isAdmin: true,
		});

		return this._appModel.usersModel.addOrUpdate(user);
	}
}

export default DevToolsStore;
