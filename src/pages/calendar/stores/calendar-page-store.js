import { computed } from "mobx";
import kebabCase from "lodash.kebabcase";

import RaceViewModel from "../models/race-view-model";
import { isAfter } from "../../../helpers/time-modification";

class CalendarPageStore {
	/**
	 * @param {AppModel} appModel
	 */
	constructor(appModel) {
		this._appModel = appModel;
	}

	/**
	 * @return {RaceViewModel[]}
	 */
	@computed
	get races() {
		return this._appModel.formulaOneOfficial.currentSeasonRounds.map(ri => {
			const { raceName, roundSchedule } = ri;

			return new RaceViewModel({
				raceName,
				raceTime: roundSchedule.race,
				qualTime: roundSchedule.qualification,
				practice1Time: roundSchedule.practices[0],
				practice2Time: roundSchedule.practices[1],
				practice3Time: roundSchedule.practices[2],
				id: kebabCase(raceName),
			});
		});
	}

	/**
	 * @return {RaceViewModel | null}
	 */
	@computed
	get nextRace() {
		const now = this._appModel.timeWatcher.currentTime;
		const [nextRace] = this.races.filter(r => isAfter(r.raceTime, now));

		return nextRace;
	}

	/**
	 * @return {boolean}
	 */
	@computed
	get isRaceWeekend() {
		return !this._appModel.isBetsAllowed;
	}

	get currentSeason() {
		return this._appModel.formulaOneOfficial.currentSeason;
	}
}

export default CalendarPageStore;
