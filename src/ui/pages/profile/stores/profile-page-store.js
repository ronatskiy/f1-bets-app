import { action, computed, observable } from "mobx";
import ProfileEditFormStore from "./profile-edit-form-store";
import User from "../../../../domain/user";

class ProfilePageStore {
	/**
	 * @param {AppModel} appModel
	 */
	constructor(appModel) {
		this._appModel = appModel;
	}

	@observable _userNameForm = null;

	/**
	 * @return {User | null}
	 */
	get currentUser() {
		return this._appModel.session.authenticatedUser;
	}

	initForm = action(() => {
		this._userNameForm = new ProfileEditFormStore({
			user: this.currentUser,
			onUserUpdate: async user => {
				const userToUpdate = new User({
					...this.currentUser,
					...user,
				});
				await this._appModel.usersModel.addOrUpdate(userToUpdate);
			},
		});
	});

	@computed
	get profileEditForm() {
		return this._userNameForm;
	}
}

export default ProfilePageStore;
