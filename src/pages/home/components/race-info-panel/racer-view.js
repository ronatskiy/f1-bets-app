import React from "react";
import PropTypes from "prop-types";

import "./racer-view.css";

const RacerView = ({ className = "", flagUrl = "", name = "", code }) => {
	return (
		<div className={`racer-view ${className}`} title={name}>
			{flagUrl && <img className="racer-view__image" src={flagUrl} alt={name} />}
			<span>{code}</span>
		</div>
	);
};

RacerView.propTypes = {
	className: PropTypes.string,
	flagUrl: PropTypes.string,
	name: PropTypes.string,
	code: PropTypes.string.isRequired,
};

export default RacerView;
