import moment from "moment";
import { action, computed, observable } from "mobx";

export default class TimeWatcher {
	constructor(tickInterval) {
		this._tickInterval = tickInterval;
	}

	@observable _currentTime = moment();

	start() {
		this._interval = setInterval(this._tick, 1000 * this._tickInterval);
		this._tick();
	}

	stop() {
		this._interval && clearInterval(this._interval);
	}

	@action
	_tick = () => {
		this._currentTime = moment();
	};

	@computed
	get currentTime() {
		return this._currentTime;
	}
}
