import { computed, when } from "mobx";

import TimeWatcher from "./time-watcher";
import OperationManager from "./operation-manager";
import SessionModel from "./session";
import { isAfter, isInInterval, subtractTime } from "../helpers/time-modification";
import RacesModel from "./races";
import UsersModel from "./user";
import FormulaOneOfficialModel from "./formula-one-official";
import configProvider from "../config/config";

const VOTE_CLOSING_TIME = configProvider.getVoteClosingTime(); // minutes

export default class AppModel {
	constructor(services) {
		const { userService, authenticationService, raceInfoService, formulaOneOfficialDataService } = services;

		const operationManager = new OperationManager();
		const tickInterval = configProvider.getTickInterval();

		this._isProductionMode = configProvider.isProductionMode();
		this._raceInfoService = raceInfoService;
		this._timeWatcher = new TimeWatcher(tickInterval);
		this._operationManager = operationManager;
		this._sessionModel = new SessionModel({ authenticationService, operationManager });
		this._usersModel = new UsersModel({
			operationManager,
			userService,
			sessionModel: this._sessionModel,
		});
		this._formulaOneOfficialModel = new FormulaOneOfficialModel({
			formulaOneOfficialDataService,
			operationManager,
		});

		this._racesModel = new RacesModel({
			formulaOneOfficialModel: this._formulaOneOfficialModel,
			raceInfoService,
			operationManager,
			timeWatcher: this._timeWatcher,
		});

		this._operationManager.runWithProgressAsync(async () => {
			await this._formulaOneOfficialModel.fetchAll();
			return this._racesModel.fetchRaces();
		});

		// Load next race info if current race is started.
		when(
			() => this.nextRace && isAfter(this._timeWatcher.currentTime, this.nextRace.raceStartTime),
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

	/**
	 * @return {Race[]}
	 */
	@computed
	get races() {
		return this._racesModel.races;
	}

	/**
	 * @return {Racer[]}
	 */
	@computed
	get racers() {
		return this._formulaOneOfficialModel.currentSeasonRacers;
	}

	/**
	 * @return {boolean}
	 */
	get isProduction() {
		return this._isProductionMode;
	}

	@computed
	get isBetsAllowed() {
		const raceStartTime = this.nextRace && this.nextRace.raceStartTime;
		const qualificationStartTime = this.nextRace && this.nextRace.qualifyingStartTime;
		if (qualificationStartTime && raceStartTime) {
			return (
				qualificationStartTime &&
				raceStartTime &&
				!isInInterval(
					this.timeWatcher.currentTime,
					subtractTime(qualificationStartTime, VOTE_CLOSING_TIME),
					raceStartTime,
				)
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
	get usersModel() {
		return this._usersModel;
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

	/**
	 * @return {FormulaOneOfficialModel}
	 */
	get formulaOneOfficial() {
		return this._formulaOneOfficialModel;
	}
}
