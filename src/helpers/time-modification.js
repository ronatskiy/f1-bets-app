import moment from "moment";

/**
 * @param {moment.Moment | string} time
 * @return {moment.Moment}
 */
function wrapToMomentIfNeeded(time) {
	if (time instanceof moment) {
		return time;
	}

	return moment(time);
}

export function isInInterval(time, startTimeInterval, endTimeInterval, unit = "minute") {
	time = wrapToMomentIfNeeded(time);
	startTimeInterval = wrapToMomentIfNeeded(startTimeInterval);
	endTimeInterval = wrapToMomentIfNeeded(endTimeInterval);

	return time.isBetween(startTimeInterval, endTimeInterval, unit);
}

/**
 * @param {moment.Moment | string} time
 * @param {number} timePeriod
 * @param {string} unit
 * @return {moment.Moment}
 */
export function subtractTime(time, timePeriod, unit = "minute") {
	time = wrapToMomentIfNeeded(time);

	return time.subtract(timePeriod, unit);
}

export function isAfter(currentTime, timeToTest) {
	return wrapToMomentIfNeeded(currentTime).isAfter(wrapToMomentIfNeeded(timeToTest));
}

/**
 * @param {moment.Moment | string} time
 * @param {number} timePeriod
 * @param {string} unit
 * @return {moment.Moment}
 */
export function addTime(time, timePeriod, unit = "minute") {
	time = wrapToMomentIfNeeded(time);

	return time.add(timePeriod, unit);
}
