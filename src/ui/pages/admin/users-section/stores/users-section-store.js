import { observable, action, computed } from "mobx";
import UserEditFormStore from "./user-edit-form-store";
import PasswordResetFormStore from "./password-reset-form-store";

export default class UsersSectionStore {
	/**
	 * @param {AppModel} appModel
	 * @param {string} USER_STORE_URL
	 */
	constructor(appModel, USER_STORE_URL) {
		this._appModel = appModel;
		this._storeApiUrl = USER_STORE_URL;
	}

	/**
	 * @type {UserEditFormStore | null}
	 */
	@observable userEditForm = null;

	/**
	 * @type {PasswordResetFormStore | null}
	 */
	@observable passwordResetForm = null;

	/**
	 * @return {User[]}
	 */
	@computed
	get users() {
		return this._appModel.usersModel.users;
	}

	get storeApiUrl() {
		return this._storeApiUrl;
	}

	@action
	editUser = id => {
		const user = this._findUserById(id);

		if (!user) {
			return;
		}

		this.userEditForm = new UserEditFormStore({
			user,
			onUserUpdate: updatedUser => {
				return this._appModel.usersModel.addOrUpdate(updatedUser);
			},
			onSuccess: () => {
				this._closeUserEditDialog();
			},
			onCancel: () => {
				this._closeUserEditDialog();
			},
		});
	};

	deleteUser = async id => {
		if (window.confirm("Вы точно хотите удалить пользователя?")) {
			return await this._appModel.usersModel.deleteUser(id);
		}
	};

	resetPassword = id => {
		const user = this._findUserById(id);

		if (!user) {
			return;
		}

		if (window.confirm("Вы точно хотите сменить пароль данному пользователю?")) {
			if (window.confirm(`Ты уверен, что хочешь сбросить пароль пользователю ${user.login}`)) {
				this._showPasswordResetDialog(id);
			}
		}
	};

	@action
	_showPasswordResetDialog = id => {
		const user = this._findUserById(id);

		if (!user) {
			return;
		}

		this.passwordResetForm = new PasswordResetFormStore({
			user,
			onSuccess: async newPassword => {
				await this._appModel.usersModel.resetPassword(id, newPassword);

				this._closePasswordResetDialog();
			},
			onCancel: () => {
				this._closePasswordResetDialog();
			},
		});
	};

	@action
	_closeUserEditDialog() {
		this.userEditForm = null;
	}

	@action
	_closePasswordResetDialog() {
		this.passwordResetForm = null;
	}

	_findUserById(id) {
		return this.users.find(u => u.id === id);
	}
}
