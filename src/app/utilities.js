import moment from "moment";

export function prettifyDate(date) {
	return moment(date).format("D MMMM YYYY, HH:mm");
}
