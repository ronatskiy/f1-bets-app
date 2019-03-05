import React from "react";
import PropTypes from "prop-types";

import Timer from "../../../../../lib/awesome-contdown-timer";

import "./styles.css";

const CountdownTimer = ({ startTime, endTime, className = "" }) => {
	return <Timer className={"countdown-timer " + className} startDate={startTime} endDate={endTime} withSplitter />;
};

CountdownTimer.propTypes = {
	startTime: PropTypes.string.isRequired,
	endTime: PropTypes.string.isRequired,
};

export default CountdownTimer;
