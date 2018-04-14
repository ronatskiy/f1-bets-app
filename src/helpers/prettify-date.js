import moment from "moment";

export function prettifyDate(date) {
	return moment(date).format("D MMMM YYYY, HH:mm");
}

export function prettifyDateWithSeconds(date) {
	return moment(date).format("D MMMM YYYY, HH:mm:ss");
}

export function toUTCStringDate(date) {
	return moment(date)
		.utc()
		.format();
}
