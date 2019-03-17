import { computed } from "mobx";
import RaceViewModel from "../models/race-view-model";

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
		return this._appModel.currentSeasonHistory.rounds.map(round => {
			const { raceName, roundSchedule, roundId } = round;

			return new RaceViewModel({
				raceName,
				raceTime: roundSchedule.race,
				qualTime: roundSchedule.qualification,
				practice1Time: roundSchedule.practices[0],
				practice2Time: roundSchedule.practices[1],
				practice3Time: roundSchedule.practices[2],
				id: roundId,
			});
		});
	}

	/**
	 * @return {RaceViewModel | null}
	 */
	@computed
	get nextRace() {
		if (!this._appModel.nextRace) {
			return null;
		}

		const nextRace = this._appModel.nextRace;

		return this.races.find(r => r.raceId === nextRace.roundId);
	}

	/**
	 * @return {boolean}
	 */
	@computed
	get isRaceWeekend() {
		return !this._appModel.isBetsAllowed;
	}

	get currentSeason() {
		return this._appModel.currentSeason;
	}
}

export default CalendarPageStore;
