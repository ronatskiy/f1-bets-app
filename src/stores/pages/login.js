import { action, observable, computed } from "mobx";

import LoginFormStore from "../forms/login-form-store";
import { loginFormSettings, registerNewAccountFormSettings } from "../forms/settings/login-form";

export default class LoginPageStore {
	/**
	 * @param {AppViewModel} viewModel
	 */
	constructor(viewModel) {
		this._appViewModel = viewModel;

		this._loginForm = new LoginFormStore(loginFormSettings, async form => {
			const result = await this._appViewModel.session.login(form.values());

			if (result !== true) {
				alert(result);
				return;
			}

			form.clear();
		});

		this._registerNewAccountForm = new LoginFormStore(registerNewAccountFormSettings, async form => {
			const result = await this._appViewModel.session.signIn(form.values());

			if (result !== true) {
				alert(result);
				return;
			}

			form.clear();
		});
	}

	@observable isRegisterNew = false;

	get isUserAuthenticated() {
		return this._appViewModel.session.isAuthenticated;
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
		return this._appViewModel.session.login({ login, password });
	}

	signIn({ name, login, password }) {
		return this._appViewModel.session.signIn({ name, login, password });
	}
}
