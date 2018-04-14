import { computed, when } from "mobx";

import TimeWatcher from "./time-watcher";
import WorkerModel from "./worker";
import SessionModel from "./session";
import { isAfter, isInInterval, subtractTime } from "./helpers";
import RacerListModel from "./racer";
import RacesModel from "./races";
import UsersModel from "./user";

const VOTE_CLOSING_TIME = 15; // minutes

export default class AppViewModel {
	constructor(services, configProvider) {
		const { userService, authenticationService, raceInfoService, racerService } = services;

		this._raceInfoService = raceInfoService;
		this._isProductionMode = configProvider.isProductionMode();
		const tickInterval = configProvider.getTickInterval();
		this._timeWatcher = new TimeWatcher(tickInterval);
		this._worker = new WorkerModel();
		this._sessionModel = new SessionModel({ authenticationService, worker: this._worker });
		this._racerListModel = new RacerListModel({ racerService, worker: this._worker });
		this._racesModel = new RacesModel({ raceInfoService, worker: this._worker, timeWatcher: this._timeWatcher });
		this._usersModel = new UsersModel({ worker: this._worker, userService, sessionModel: this._sessionModel });

		// Load next race info if current race is started.
		when(
			() => this.nextRace && isAfter(this.currentTime, this.nextRace.raceStartTime),
			async () => {
				await this._racesModel.fetchRaces();
			},
		);
	}

	@computed
	get isUserAlreadyBet() {
		if (!this._sessionModel.authenticatedUser) {
			return false;
		}

		if (this.nextRace) {
			return this.nextRace.bets.some(bet => bet.userInfo.id === this._sessionModel.authenticatedUser.id);
		}

		return false;
	}

	@computed
	get races() {
		return this._racesModel.races;
	}

	@computed
	get racers() {
		return this._racerListModel.racers;
	}

	/**
	 * @return {boolean}
	 */
	get isProduction() {
		return this._isProductionMode;
	}

	/**
	 *
	 * @return {TimeWatcher}
	 */
	// @computed
	get timeWatcher() {
		return this._timeWatcher;
	}

	operationWithProgress(operation) {
		return this._worker.operationWithProgress(operation);
	}

	operationWithProgressAsync(operation) {
		return this._worker.operationWithProgressAsync(operation);
	}

	get worker() {
		return this._worker;
	}

	@computed
	get hasPendingTasks() {
		return this._worker.pendingTasksCount > 0;
	}

	@computed
	get isBetsAllowed() {
		const raceStartTime = this.nextRace && this.nextRace.raceStartTime;
		const qualificationStartTime = this.nextRace && this.nextRace.qualifyingStartTime;
		if (qualificationStartTime && raceStartTime) {
			return (
				qualificationStartTime &&
				raceStartTime &&
				!isInInterval(subtractTime(qualificationStartTime, VOTE_CLOSING_TIME), raceStartTime)
			);
		}

		return false;
	}

	get isUserAuthenticated() {
		return this._sessionModel.isAuthenticated;
	}

	get isUserAdmin() {
		return this._sessionModel.isCurrentUserAdmin;
	}

	/**
	 * @return {Race | null}
	 */
	get nextRace() {
		return this._racesModel.nextRace;
	}

	addNewBet(bet) {
		return this._racesModel.addNewBet(bet);
	}

	@computed
	get authUserBets() {
		const resultBets = [];
		if (!this._sessionModel.authenticatedUser) {
			return resultBets;
		}
		const currentUserId = this._sessionModel.authenticatedUser.id;

		this.races.forEach(({ bets, prettyTitle, id }) => {
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

	/**
	 * @return {SessionModel}
	 */
	get session() {
		return this._sessionModel;
	}

	/**
	 * @return {UsersModel}
	 */
	get users() {
		return this._usersModel;
	}
}
