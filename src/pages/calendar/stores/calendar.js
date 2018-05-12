import { computed } from "mobx";
import kebabCase from "lodash.kebabcase";

import RaceViewModel from "../models/race-view-model";
import { isAfter } from "../../../helpers/time-modification";

class CalendarPageStore {
	/**
	 * @param {AppViewModel} viewModel
	 */
	constructor(viewModel) {
		this._appViewModel = viewModel;
	}

	/**
	 * @return {RaceViewModel[]}
	 */
	@computed
	get races() {
		return this._appViewModel.formulaOneOfficial.roundsInfo.map(
			ri =>
				new RaceViewModel({
					raceName: ri.raceName,
					raceTime: ri.roundSchedule.race,
					qualTime: ri.roundSchedule.qualification,
					practice1Time: ri.roundSchedule.practices[0],
					practice2Time: ri.roundSchedule.practices[1],
					practice3Time: ri.roundSchedule.practices[2],
					id: kebabCase(ri.raceName),
				}),
		);
	}

	/**
	 * @return {RaceViewModel | null}
	 */
	@computed
	get nextRace() {
		const now = this._appViewModel.timeWatcher.currentTime;
		const [nextRace] = this.races.filter(r => isAfter(r.raceTime, now));

		return nextRace;
	}

	/**
	 * @return {boolean}
	 */
	@computed
	get isRaceWeekend() {
		return !this._appViewModel.isBetsAllowed;
	}
}

export default CalendarPageStore;
