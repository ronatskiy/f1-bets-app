import React from "react";
import PropTypes from "prop-types";

const Splitter = ({ splitter = ":" }) => {
	return <div className="awesome-countdown-timer__splitter">{splitter}</div>;
};

Splitter.propTypes = {
	splitter: PropTypes.string,
};

export default Splitter;
