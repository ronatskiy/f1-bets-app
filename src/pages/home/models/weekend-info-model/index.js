import { getFlagUrlByCountryName } from "../../../../lib/country-flags/index";
import PracticeInfoModel from "./practice-info";
import RaceInfoModel from "./race-info-model";
import QualificationInfoModel from "./qualification-info-model";
import { shortDate } from "../../../../helpers/prettify-date";

export default class WeekendInfoModel {
	/**
	 * @param {ErgastApi~Race} raceInfo
	 */
	constructor(raceInfo) {
		this._race = raceInfo;
	}

	get _firstPracticeStartTime() {
		if (this._race.calendar) {
			return this._race.calendar.practice_1;
		}

		return "";
	}

	get _secondPracticeStartTime() {
		if (this._race.calendar) {
			return this._race.calendar.practice_2;
		}

		return "";
	}

	get _thirdPracticeStartTime() {
		if (this._race.calendar) {
			return this._race.calendar.practice_3;
		}

		return "";
	}

	get _qualificationStartTime() {
		if (this._race.calendar) {
			return this._race.calendar.qualification;
		}

		return "";
	}

	get raceStartTime() {
		if (this._race.calendar) {
			return this._race.calendar.race;
		}
		return this._race.date + "T" + this._race.time;
	}

	get countryName() {
		return this._race.circuit.location.country;
	}

	get circuitUrl() {
		return this._race.circuit.url;
	}

	get raceUrl() {
		return this._race.url;
	}

	get flagUrl() {
		return getFlagUrlByCountryName(this.countryName);
	}

	get raceTitle() {
		return `Formula 1 ${this._race.season} ${this._race.raceName}`;
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
}
