import { computed, observable } from "mobx";
import moment from "moment";

import { IS_PRODUCTION_MODE } from "../config/config";

class AppStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this._isProductionMode = IS_PRODUCTION_MODE;
		this._tick();
	}

	@observable currentTime = moment();

	@computed
	get hasPendingTasks() {
		return this.rootStore.pendingTasksCount > 0;
	}

	@computed
	get isBetsAllowed() {
		const raceStartTime = this.rootStore.racesStore.nextRace && this.rootStore.racesStore.nextRace.raceStartTime;
		const qualificationStartTime =
			this.rootStore.racesStore.nextRace && this.rootStore.racesStore.nextRace.qualifyingStartTime;

		return qualificationStartTime && raceStartTime
			? !this.currentTime.isBetween(moment(qualificationStartTime).subtract(1, "hour"), raceStartTime, "minute")
			: false;
	}

	get isProduction() {
		return this._isProductionMode;
	}

	startTimeWatcher() {
		this._interval = setInterval(this._tick, 1000 * 15);
		this._tick();
	}

	stopTimeWatcher() {
		this._interval && clearInterval(this._interval);
	}

	_tick = () => {
		this.currentTime = moment();
	};
}

export default AppStore;
