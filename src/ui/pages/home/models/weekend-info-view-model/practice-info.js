import { extractTime } from "../../../../../helpers/prettify-date";
import { addTime } from "../../../../../helpers/time-modification";
import RaceInfoModel from "./race-info-model";

export default class PracticeInfoModel extends RaceInfoModel {
	constructor(practiceNumber, date) {
		super(date);
		this._practiceNumber = practiceNumber;
	}

	get title() {
		return `Практика ${this._practiceNumber}`;
	}

	get timeInterval() {
		if (this._date) {
			return `${extractTime(this._date)} - ${extractTime(
				addTime(this._date, this._practiceNumber === 3 ? 1 : 1.5, "hour"),
			)}`;
		}
		return "";
	}
}
