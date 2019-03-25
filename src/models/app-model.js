import { computed, when } from "mobx";

import TimeWatcher from "./time-watcher";
import OperationManager from "./operation-manager";
import SessionModel from "./session";
import { isAfter, isInInterval, subtractTime } from "../helpers/time-modification";
import UsersModel from "./user";
import configProvider from "../config/config";
import FormulaOneHistoryModel from "./formula-one-history-model";

const VOTE_CLOSING_TIME = configProvider.getVoteClosingTime(); // minutes

/**
 * @property {string} currentSeason
 */
export default class AppModel {
	constructor(services) {
		const operationManager = new OperationManager();
		const tickInterval = configProvider.getTickInterval();
		const { userService, authenticationService } = services;
		this.services = services;
		this._timeWatcher = new TimeWatcher(tickInterval);
		this.currentSeason = this._timeWatcher.currentYear.toString();
		this._operationManager = operationManager;
		this._usersModel = new UsersModel({
			operationManager,
			userService,
		});
		this._sessionModel = new SessionModel({
			authenticationService,
			operationManager,
			usersModel: this._usersModel,
		});

		this._formulaOneHistoryModel = new FormulaOneHistoryModel(this.currentSeason, services, operationManager);

		this.loadSeasonData(this.currentSeason);

		// Load next race info if current race is started.
		when(
			() => this.nextRace && isAfter(this._timeWatcher.currentTime, this.nextRace.raceStartTime),
			() => {
				this._reloadSeasonData(this.currentSeason);
			},
		);
	}

	/**
	 * @return {History}
	 */
	get currentSeasonHistory() {
		return this._formulaOneHistoryModel.currentSeasonHistory;
	}

	/**
	 * @return {Race | null}
	 */
	@computed
	get nextRace() {
		const currentTime = this._timeWatcher.currentTime;
		const [nextRace] = this.currentSeasonHistory.races.filter(race => isAfter(race.raceStartTime, currentTime));

		return nextRace || null;
	}

	/**
	 * @return {boolean}
	 */
	get isProduction() {
		return configProvider.isProductionMode();
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

	/**
	 * @return {boolean}
	 */
	@computed
	get isBetsAllowed() {
		if (!this.nextRace) {
			return false;
		}

		const { raceStartTime, qualifyingStartTime: qualificationStartTime } = this.nextRace;

		if (!(qualificationStartTime && raceStartTime)) {
			return false;
		}

		return !isInInterval(
			this.timeWatcher.currentTime,
			subtractTime(qualificationStartTime, VOTE_CLOSING_TIME),
			raceStartTime,
		);
	}

	get isUserAuthenticated() {
		return this._sessionModel.isAuthenticated;
	}

	get isUserAdmin() {
		return this._sessionModel.isCurrentUserAdmin;
	}

	/**
	 * Authenticated user's bets list
	 * @return {Array}
	 */
	@computed
	get authUserBets() {
		if (!this._sessionModel.authenticatedUser) {
			return [];
		}

		const resultBets = [];
		const currentUserId = this._sessionModel.authenticatedUser.id;

		this.currentSeasonHistory.races.forEach(({ bets, prettyTitle, roundId }) => {
			if (bets.some(bet => bet.userInfo.id === currentUserId)) {
				const bet = bets[bets.findIndex(bet => bet.userInfo.id === currentUserId)];

				resultBets.push({
					raceId: roundId,
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
	get usersModel() {
		return this._usersModel;
	}

	/**
	 * @return {FormulaOneHistoryModel}
	 */
	get formulaOneHistory() {
		return this._formulaOneHistoryModel;
	}

	/**
	 * @return {TimeWatcher}
	 */
	get timeWatcher() {
		return this._timeWatcher;
	}

	/**
	 * @return {OperationManager}
	 */
	get operationManager() {
		return this._operationManager;
	}

	async addNewBet(bet) {
		return this._operationManager.runWithProgressAsync(async () => {
			try {
				await this.services.racesInfoService.addOrUpdateBet(bet, this.nextRace);
			} catch (error) {
				console.error("Can't update Bet", error);
			}

			await this._reloadSeasonData(this.currentSeason);
		});
	}

	/**
	 * @param {string} season
	 * @param {boolean} refresh
	 */
	loadSeasonData(season, refresh = false) {
		return this._formulaOneHistoryModel.loadSeasonHistory(season);
	}

	/**
	 * @param {string} season
	 */
	_reloadSeasonData(season) {
		this._formulaOneHistoryModel.loadSeasonHistory(season, /* refresh */ true);
	}
}
