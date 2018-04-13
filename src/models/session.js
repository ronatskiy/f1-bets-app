import { computed, observable, action, runInAction } from "mobx";
import User from "../domain/user";

/**
 * @class SessionModel
 * @property {User} authenticatedUser
 */
export default class SessionModel {
	/**
	 * @param {AuthenticationService} authenticationService
	 * @param {WorkerModel} worker
	 */
	constructor({ authenticationService, worker }) {
		this._authService = authenticationService;
		this._worker = worker;

		this._worker.operationWithProgressAsync(async () => {
			const user = await authenticationService.authenticate();

			if (user instanceof User) {
				runInAction(() => {
					this.authenticatedUser = user;
				});
			}

			return user;
		});
	}

	@observable authenticatedUser = null;

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
		return this._worker.operationWithProgressAsync(async () => {
			const resp = await this._authService.login({ login, password });

			if (resp instanceof User) {
				runInAction(() => {
					this.authenticatedUser = resp;
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
			this.authenticatedUser = null;
		}
	}

	@action
	async signIn({ login, name, password }) {
		return this._worker.operationWithProgressAsync(() => this._authService.signIn({ login, name, password }));
	}
}
