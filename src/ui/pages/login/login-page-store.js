import { action, observable, computed } from "mobx";

import LoginFormStore from "../../stores/forms/login-form-store";
import { loginFormSettings, registerNewAccountFormSettings } from "../../stores/forms/settings/login-form";

export default class LoginPageStore {
	/**
	 * @param {AppModel} appModel
	 */
	constructor(appModel) {
		this._appModel = appModel;

		this._loginForm = new LoginFormStore(loginFormSettings, async form => {
			const result = await this._appModel.session.login(form.values());

			if (result !== true) {
				alert(result);
				return;
			}

			form.clear();
		});

		this._registerNewAccountForm = new LoginFormStore(registerNewAccountFormSettings, async form => {
			const result = await this._appModel.session.signIn(form.values());

			if (result !== true) {
				alert(result);
				return;
			}

			form.clear();
		});
	}

	@observable isRegisterNew = false;

	get isUserAuthenticated() {
		return this._appModel.session.isAuthenticated;
	}

	@computed
	get form() {
		return this.isRegisterNew ? this._registerNewAccountForm : this._loginForm;
	}

	@action
	toggleRegisterNewForm() {
		this.isRegisterNew = !this.isRegisterNew;
	}

	login({ login, password }) {
		return this._appModel.session.login({ login, password });
	}

	signIn({ name, login, password }) {
		return this._appModel.session.signIn({ name, login, password });
	}
}
