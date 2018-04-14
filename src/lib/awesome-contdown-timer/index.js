import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import TimerView from "./components/timer-view";
import "./styles.css";

function durationCalc(startDate, endDate) {
	const now = !startDate ? moment() : moment(startDate); // today's date
	const end = moment(endDate); // end date
	const duration = moment.duration(end.diff(now));

	if (duration.asSeconds() >= 0) {
		return duration;
	} else {
		return null;
	}
}

class AwesomeCountdownTimer extends Component {
	render() {
		const { className, withSplitter, startDate, endDate } = this.props;
		const duration = durationCalc(startDate, endDate);

		return <TimerView className={className} duration={duration} withSplitter={withSplitter} />;
	}
}

AwesomeCountdownTimer.propTypes = {
	startDate: PropTypes.string.isRequired,
	endDate: PropTypes.string.isRequired,
	className: PropTypes.string,
	withSplitter: PropTypes.bool,
};

AwesomeCountdownTimer.defaultProps = {
	className: "",
	withSplitter: false,
};

export default AwesomeCountdownTimer;
