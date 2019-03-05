import { findFlagUrlByCountryName } from "country-flags-svg";
import PracticeInfoModel from "./practice-info";
import RaceInfoModel from "./race-info-model";
import QualificationInfoModel from "./qualification-info-model";
import { shortDate } from "../../../../../helpers/prettify-date";

/**
 * @property {RacerViewModel[]} racerStandings
 */
export default class WeekendInfoModel {
	/**
	 * @param {FormulaOneRound} roundInfo
	 */
	constructor(roundInfo) {
		this._roundInfo = roundInfo;
		this.racerStandings = [];
	}

	get _firstPracticeStartTime() {
		if (this._roundInfo.roundSchedule) {
			return this._roundInfo.roundSchedule.practices[0] || "";
		}

		return "";
	}

	get _secondPracticeStartTime() {
		if (this._roundInfo.roundSchedule) {
			return this._roundInfo.roundSchedule.practices[1] || "";
		}

		return "";
	}

	get _thirdPracticeStartTime() {
		if (this._roundInfo.roundSchedule) {
			return this._roundInfo.roundSchedule.practices[2] || "";
		}

		return "";
	}

	get _qualificationStartTime() {
		if (this._roundInfo.roundSchedule) {
			return this._roundInfo.roundSchedule.qualification;
		}

		return "";
	}

	get raceStartTime() {
		if (this._roundInfo.roundSchedule) {
			return this._roundInfo.roundSchedule.race;
		}

		return "";
	}

	get countryName() {
		return this._roundInfo.circuit.countryName;
	}

	get circuitUrl() {
		return this._roundInfo.circuit.url;
	}

	get raceUrl() {
		return this._roundInfo.raceUrl;
	}

	get flagUrl() {
		return findFlagUrlByCountryName(this.countryName);
	}

	get raceTitle() {
		return `Formula 1 ${this._roundInfo.raceName} ${this._roundInfo.season}`;
	}

	get practices() {
		return [
			new PracticeInfoModel(1, this._firstPracticeStartTime),
			new PracticeInfoModel(2, this._secondPracticeStartTime),
			new PracticeInfoModel(3, this._thirdPracticeStartTime),
		];
	}

	get qualification() {
		return new QualificationInfoModel(this._qualificationStartTime);
	}

	get race() {
		return new RaceInfoModel(this.raceStartTime);
	}

	get weekendInterval() {
		return `${shortDate(this._firstPracticeStartTime)} - ${shortDate(this.raceStartTime)}`;
	}

	addRacerStandings(racerStandings = []) {
		this.racerStandings = racerStandings;

		return this;
	}
}
