import React from "react";
import PropTypes from "prop-types";

const TimeField = ({ value, label }) => {
	return (
		<div className="awesome-countdown-timer__section awesome-countdown-timer-section">
			<div className="awesome-countdown-timer-section__time">{value}</div>
			<div className="awesome-countdown-timer-section__label">{label}</div>
		</div>
	);
};

TimeField.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	label: PropTypes.string.isRequired,
};

export default TimeField;
