import React from "react";
import PropTypes from "prop-types";

import Timer from "../../../../../lib/awesome-contdown-timer/index";

import "./styles.css";

const CountdownTimer = ({ time, className = "" }) => {
	return <Timer className={"countdown-timer " + className} endDate={time} withSplitter />;
};

CountdownTimer.propTypes = {
	time: PropTypes.string.isRequired,
};

export default CountdownTimer;
