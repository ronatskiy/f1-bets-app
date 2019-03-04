import { computed, observable, action, runInAction } from "mobx";

import { isAfter } from "../helpers/time-modification";
import Race from "../domain/race";

class RacesModel {
	/**
	 * @param {FormulaOneOfficialModel} formulaOneOfficialModel
	 * @param {OperationManager} operationManager
	 * @param {RaceInfoService} raceInfoService
	 * @param timeWatcher
	 */
	constructor({ formulaOneOfficialModel, operationManager, raceInfoService, timeWatcher }) {
		this._formulaOneOfficialModel = formulaOneOfficialModel;
		this._operationManager = operationManager;
		this._timeWatcher = timeWatcher;
		this._raceInfoService = raceInfoService;
	}

	/**
	 * @type {Race[]}
	 */
	@observable races = [];

	/**
	 * @return {Race | null}
	 */
	@computed
	get nextRace() {
		const currentTime = this._timeWatcher.currentTime;
		const [nextRace] = this.races.filter(r => isAfter(r.raceStartTime, currentTime));

		return nextRace;
	}

	@action
	async fetchRaces() {
		return this._operationManager.runWithProgressAsync(async () => {
			const { currentSeasonRounds } = this._formulaOneOfficialModel;
			const races = await this._raceInfoService.fetchAll();

			runInAction(() => {
				// mix local stored bets and results into formulaOneOfficial round info
				this.races = [
					...currentSeasonRounds.map(round => {
						const relativeRace = races.find(race => race.roundId === round.roundId);

						return new Race({
							...round,
							bets: relativeRace ? relativeRace.bets : [],
							raceResults: relativeRace ? relativeRace.raceResults : {},
						});
					}),
				];
			});
		});
	}

	@action
	async addNewBet(bet) {
		return this._operationManager.runWithProgressAsync(async () => {
			try {
				await this._raceInfoService.addOrUpdateBet(bet, this.nextRace);
				await this.fetchRaces();
			} catch (error) {
				console.error("Can't update Bet in 'RacesStore'", error);
			}
		});
	}
}

export default RacesModel;
