import { computed } from "mobx";

export default class BetPageStore {
	/**
	 * @param {AppModel} appModel
	 */
	constructor(appModel) {
		this._appModel = appModel;
	}

	/**
	 * @return {Racer[]}
	 */
	get racers() {
		return this._appModel.currentSeasonHistory.racers;
	}

	/**
	 * @return {User}
	 */
	@computed
	get currentUser() {
		return this._appModel.session.authenticatedUser;
	}

	@computed
	get nextRaceTitle() {
		return this._appModel.nextRace ? this._appModel.nextRace.prettyTitle : "";
	}

	@computed
	get usersBet() {
		if (!this._appModel.isUserAlreadyBet) {
			return {};
		}

		const betInfo = this._appModel.nextRace.bets.find(({ userInfo }) => userInfo.id === this.currentUser.id);

		return betInfo ? betInfo.betsMap : {};
	}

	/**
	 * @return {boolean}
	 */
	get isBetsAllowed() {
		return this._appModel.isBetsAllowed;
	}

	submitBet(bet) {
		return this._appModel.addNewBet(bet);
	}
}
