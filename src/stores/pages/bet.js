import { computed } from "mobx";

export default class BetPageStore {
	/**
	 * @param {AppViewModel} viewModel
	 */
	constructor(viewModel) {
		this._appViewModel = viewModel;
	}

	get racers() {
		return this._appViewModel.racers;
	}

	/**
	 * @return {User}
	 */
	@computed
	get currentUser() {
		return this._appViewModel.session.authenticatedUser;
	}

	@computed
	get nextRaceTitle() {
		if (this._appViewModel.nextRace) {
			return this._appViewModel.nextRace.prettyTitle;
		}
		return "";
	}

	@computed
	get userBet() {
		if (!this._appViewModel.isUserAlreadyBet) {
			return {};
		}

		const betInfo = this._appViewModel.nextRace.bets.find(({ userInfo }) => userInfo.id === this.currentUser.id);

		return betInfo ? betInfo.betsMap : {};
	}

	get isBetsAllowed() {
		return this._appViewModel.isBetsAllowed;
	}

	onBetsSubmit = bets => {
		return this._appViewModel.addNewBet(bets);
	};
}
