import { computed, observable, action, runInAction } from "mobx";

import isEqual from "lodash.isequal";
import { isAfter } from "./helpers";

class RacesModel {
	constructor({ worker, raceInfoService, timeWatcher }) {
		this._worker = worker;
		this._timeWatcher = timeWatcher;
		this._raceInfoService = raceInfoService;
		this.fetchRaces();
	}

	@observable races = [];

	/**
	 * @return {Race | null}
	 */
	@computed.equals(isEqual)
	get nextRace() {
		const currentTime = this._timeWatcher.currentTime;
		const [nextRace] = this.races.filter(r => isAfter(r.raceStartTime, currentTime));

		return nextRace;
	}

	@action
	async fetchRaces() {
		return this._worker.operationWithProgressAsync(async () => {
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
		return this._worker.operationWithProgressAsync(async () => {
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
