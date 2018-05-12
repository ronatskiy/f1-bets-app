import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import * as faAngleDown from "@fortawesome/fontawesome-free-solid/faAngleDown";
import cn from "classnames";

import "./chevron-icon.css";

const ChevronIcon = ({ direction = "down", className = "" }) => {
	const classNames = cn("chevron-icon", `chevron-icon--${direction}`, className);

	return <FontAwesomeIcon className={classNames} icon={faAngleDown} />;
};

ChevronIcon.propTypes = {
	className: PropTypes.string,
	direction: PropTypes.oneOf(["down", "top", "left", "right"]),
};

export default ChevronIcon;
