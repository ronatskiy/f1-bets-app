import { extractDay, extractTime } from "../../../../../helpers/prettify-date";

export default class RaceInfoModel {
	constructor(date) {
		this._date = date;
	}

	get title() {
		return `Гонка`;
	}

	get day() {
		return extractDay(this._date);
	}

	get timeInterval() {
		if (this._date) {
			return `${extractTime(this._date)}`;
		}
		return "";
	}
}
