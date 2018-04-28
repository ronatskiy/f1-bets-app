import { computed } from "mobx";
import { isAfter } from "../../../helpers/time-modification";
import WeekendInfoModel from "../models/weekend-info-model/index";

export default class HomePageStore {
	/**
	 * @param {AppViewModel} viewModel
	 */
	constructor(viewModel) {
		this._appViewModel = viewModel;
	}

	get nextRace() {
		return this._appViewModel.nextRace;
	}

	get isAuthenticated() {
		return this._appViewModel.session.isAuthenticated;
	}

	get isUserAlreadyBet() {
		return this._appViewModel.isUserAlreadyBet;
	}

	get isBetsAllowed() {
		return this._appViewModel.isBetsAllowed;
	}

	@computed
	get nextRaceInfo() {
		const now = this._appViewModel.timeWatcher.currentTime;

		const [nextRace] = this._appViewModel.formulaOneOfficial.racesSchedule
			.map(race => new WeekendInfoModel(race))
			.filter(r => isAfter(r.raceStartTime, now));

		return nextRace;
	}

	@computed
	get previousRaces() {
		const now = this._appViewModel.timeWatcher.currentTime;

		return this._appViewModel.formulaOneOfficial.racesSchedule
			.map(race => new WeekendInfoModel(race))
			.filter(r => !isAfter(r.raceStartTime, now))
			.reverse();
	}
}
