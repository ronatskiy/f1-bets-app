import { computed, observable, action, runInAction } from "mobx";
import User from "../domain/user";

/**
 * @class SessionModel
 * @property {User} authenticatedUser
 */
export default class SessionModel {
	/**
	 * @param {AuthenticationService} authenticationService
	 * @param {OperationManager} operationManager
	 * @param {UsersModel} usersModel
	 */
	constructor({ authenticationService, operationManager, usersModel }) {
		this._authService = authenticationService;
		this._operationManager = operationManager;
		this._usersModel = usersModel;

		this._operationManager.runWithProgressAsync(async () => {
			const user = await authenticationService.authenticate();

			if (user instanceof User) {
				runInAction(() => {
					this.authenticatedUserId = user.id;
				});
			}

			return user;
		});
	}

	@observable authenticatedUserId = null;

	@computed
	get authenticatedUser() {
		if (!this.authenticatedUserId) {
			return null;
		}

		return this._usersModel.users.find(user => user.id === this.authenticatedUserId) || null;
	}

	@computed
	get isAuthenticated() {
		return this.authenticatedUser !== null;
	}

	@computed
	get isCurrentUserAdmin() {
		return this.isAuthenticated && this.authenticatedUser.isAdmin;
	}

	@action
	async login({ login, password }) {
		return this._operationManager.runWithProgressAsync(async () => {
			const resp = await this._authService.login({ login, password });

			if (resp instanceof User) {
				runInAction(() => {
					this.authenticatedUserId = resp.id;
				});
				return true;
			}

			return resp;
		});
	}

	@action
	logout() {
		if (this.isAuthenticated) {
			this._authService.logout();
			this.authenticatedUserId = null;
		}
	}

	@action
	async signIn({ login, name, password }) {
		return this._operationManager.runWithProgressAsync(async () => {
			const resp = await this._authService.signIn({ login, name, password });

			if (resp instanceof User) {
				runInAction(() => {
					this.authenticatedUserId = resp.id;
				});
				return true;
			}

			return resp;
		});
	}
}
