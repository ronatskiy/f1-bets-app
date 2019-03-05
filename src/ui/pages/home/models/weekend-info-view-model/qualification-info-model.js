import { extractTime } from "../../../../../helpers/prettify-date";
import { addTime } from "../../../../../helpers/time-modification";
import RaceInfoModel from "./race-info-model";

export default class QualificationInfoModel extends RaceInfoModel {
	get title() {
		return "Квалификация";
	}

	get timeInterval() {
		if (this._date) {
			return `${extractTime(this._date)} - ${extractTime(addTime(this._date, 1, "hour"))}`;
		}
		return "";
	}
}
