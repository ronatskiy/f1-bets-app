import { observable, computed, action } from "mobx";
import { UserRepository } from "../storage";
import isEqual from "lodash.isequal";

class UserStore {
	@observable users = [];

	@computed
	get currentUser() {
		return this.rootStore.sessionStore.currentUser;
	}

	@computed({
		equals: isEqual,
	})
	get isCurrentUserAlreadyBet() {
		if (!this.currentUser) {
			return false;
		}

		const { nextRace } = this.rootStore.racesStore;

		return nextRace.bets.some(bet => bet.userInfo.id === this.currentUser.id);
	}

	@computed({
		equals: isEqual,
	})
	get currentUserBets() {
		const resultBets = [];
		if (!this.currentUser) {
			return resultBets;
		}

		const { races } = this.rootStore.racesStore;
		const currentUserId = this.currentUser.id;

		races.forEach(({ bets, prettyTitle, id }) => {
			if (bets.some(bet => bet.userInfo.id === currentUserId)) {
				const bet = bets[bets.findIndex(bet => bet.userInfo.id === currentUserId)];
				resultBets.push({
					raceId: id,
					title: prettyTitle,
					bet: bet.betsMap,
				});
			}
		});

		return resultBets;
	}

	constructor(rootStore) {
		this.rootStore = rootStore;
		this._loadUsers();
	}

	async _loadUsers() {
		try {
			this.users = await UserRepository.getAll();
		} catch (error) {
			console.error("Can't load 'users'", error);
		}
	}

	@action
	fetchUsers() {
		this._loadUsers();
	}
}

export default UserStore;
