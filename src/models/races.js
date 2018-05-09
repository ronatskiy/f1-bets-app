import { computed, observable, action, runInAction } from "mobx";

import { isAfter } from "../helpers/time-modification";

class RacesModel {
	constructor({ operationManager, raceInfoService, timeWatcher }) {
		this._operationManager = operationManager;
		this._timeWatcher = timeWatcher;
		this._raceInfoService = raceInfoService;
		this.fetchRaces();
	}

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
			try {
				const races = await this._raceInfoService.fetchAll();

				runInAction(() => {
					this.races = races;
				});
			} catch (error) {
				console.log("Can't load 'races' in 'RacesStore'!!\n", error);
			}
		});
	}

	@action
	async addNewBet(bet) {
		return this._operationManager.runWithProgressAsync(async () => {
			try {
				await this._raceInfoService.addOrUpdateBet(bet, this.nextRace.id);
				await this.fetchRaces();
			} catch (error) {
				console.error("Can't update Bet in 'RacesStore'", error);
			}
		});
	}
}

export default RacesModel;
