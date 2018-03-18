import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import TimeField from "./time-field";
import "./styles.css";

class AwesomeCountdownTimer extends Component {
	state = {
		timeRemaining: {
			months: "",
			days: "",
			hours: "",
			minutes: "",
			seconds: "",
		},
		startDate: moment(),
		min: new Date(),
		startTimer: false,
	};

	componentDidMount() {
		this.interval = setInterval(this.tick, 1000);
		this.tick();
	}

	componentWillUnmount() {
		this.interval && clearInterval(this.interval);
	}

	tick = () => {
		const { endDate } = this.props;
		const now = moment(); // today's date
		const end = moment(endDate); // end date
		const duration = moment.duration(end.diff(now));

		if (duration.asSeconds() >= 0) {
			this.afterEachSecond(duration);
		} else {
			clearInterval(this.interval);
			this.interval = null;
		}
	};

	afterEachSecond(duration) {
		const timeRemaining = { months: "", days: "", hours: "", minutes: "", seconds: "" };

		if (Math.floor(duration.asMonths()) > 0) {
			if (Math.floor(duration.asMonths()) < 10) {
				timeRemaining.months = "0" + Math.floor(duration.asMonths());
			} else {
				timeRemaining.months = Math.floor(duration.asMonths());
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
		this.setState({
			timeRemaining,
		});
	}

	render() {
		const { className, withSplitter } = this.props;
		const { months, days, hours, minutes, seconds } = this.state.timeRemaining;

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
	}
}

AwesomeCountdownTimer.propTypes = {
	endDate: PropTypes.string.isRequired,
	className: PropTypes.string,
	withSplitter: PropTypes.bool,
};

AwesomeCountdownTimer.defaultProps = {
	className: "",
	withSplitter: false,
};

const Splitter = ({ splitter = ":" }) => {
	return <div className="awesome-countdown-timer__splitter">{splitter}</div>;
};

Splitter.propTypes = {
	splitter: PropTypes.string,
};

export default AwesomeCountdownTimer;
