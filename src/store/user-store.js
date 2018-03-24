import { observable, computed, action } from "mobx";
import { UserRepository } from "../storage";
import isEqual from "lodash.isequal";

class UserStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this._loadUsers();
	}

	@observable users = [];

	@computed
	get currentUser() {
		return this.rootStore.sessionStore.currentUser;
	}

	@computed.equals(isEqual)
	get isCurrentUserAlreadyBet() {
		if (!this.currentUser) {
			return false;
		}

		const { nextRace } = this.rootStore.racesStore;

		if (nextRace) {
			return nextRace.bets.some(bet => bet.userInfo.id === this.currentUser.id);
		}

		return false;
	}

	@computed.equals(isEqual)
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

	async _loadUsers() {
		try {
			this.rootStore.pendingTasksCount++;
			this.users = await UserRepository.getAll();
			this.rootStore.pendingTasksCount--;
		} catch (error) {
			this.rootStore.pendingTasksCount--;
			console.log("Can't load 'users' in UserStore!!\n", error);
		}
	}

	@action
	fetchUsers() {
		return this._loadUsers();
	}

	async deleteUser(id) {
		await UserRepository.delete(id);
		await this._loadUsers();
	}
}

export default UserStore;
