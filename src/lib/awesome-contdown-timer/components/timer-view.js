import React from "react";
import PropTypes from "prop-types";

import TimeField from "./time-field";
import Splitter from "./splitter";

function parseDuration(duration) {
	const timeRemaining = { months: "", days: "", hours: "", minutes: "", seconds: "" };

	if (!duration) {
		return timeRemaining;
	}

	if (Math.floor(duration.asMonths()) > 0) {
		if (Math.floor(duration.months()) < 10) {
			timeRemaining.months = "0" + Math.floor(duration.months());
		} else {
			timeRemaining.months = Math.floor(duration.months());
		}
	}
	if (Math.floor(duration.asDays()) > 0) {
		if (Math.floor(duration.days()) < 10) {
			timeRemaining.days = "0" + Math.floor(duration.days());
		} else {
			timeRemaining.days = Math.floor(duration.days());
		}
	}
	if (Math.floor(duration.asHours()) > 0) {
		if (Math.floor(duration.hours()) < 10) {
			timeRemaining.hours = "0" + Math.floor(duration.hours());
		} else {
			timeRemaining.hours = Math.floor(duration.hours());
		}
	}
	if (Math.floor(duration.asMinutes()) > 0) {
		if (Math.floor(duration.minutes()) < 10) {
			timeRemaining.minutes = "0" + Math.floor(duration.minutes());
		} else {
			timeRemaining.minutes = Math.floor(duration.minutes());
		}
	}
	if (Math.floor(duration.asSeconds()) > 0) {
		if (Math.floor(duration.seconds()) < 10) {
			timeRemaining.seconds = "0" + Math.floor(duration.seconds());
		} else {
			timeRemaining.seconds = Math.floor(duration.seconds());
		}
	}

	return timeRemaining;
}

const TimerView = ({ className, withSplitter, duration }) => {
	const { months, days, hours, minutes, seconds } = parseDuration(duration);

	return (
		<div className={`awesome-countdown-timer ${className}`}>
			{months && <TimeField value={months} label="Months" />}
			{withSplitter && months && <Splitter />}
			{days && <TimeField value={days} label="Days" />}
			{withSplitter && days && <Splitter />}
			{hours && <TimeField value={hours} label="Hours" />}
			{withSplitter && hours && <Splitter />}
			{minutes && <TimeField value={minutes} label="Minutes" />}
			{withSplitter && minutes && <Splitter />}
			{seconds && <TimeField value={seconds} label="Seconds" />}
		</div>
	);
};

TimerView.propTypes = {
	duration: PropTypes.shape({
		asMonths: PropTypes.func.isRequired,
		months: PropTypes.func.isRequired,
		asDays: PropTypes.func.isRequired,
		days: PropTypes.func.isRequired,
		asHours: PropTypes.func.isRequired,
		hours: PropTypes.func.isRequired,
		asMinutes: PropTypes.func.isRequired,
		minutes: PropTypes.func.isRequired,
		asSeconds: PropTypes.func.isRequired,
		seconds: PropTypes.func.isRequired,
	}).isRequired,
	className: PropTypes.string,
	withSplitter: PropTypes.bool,
};

TimerView.defaultProps = {
	className: "",
	withSplitter: false,
};

export default TimerView;
