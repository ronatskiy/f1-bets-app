import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Chevron } from "../../images/chevron.svg";
import cn from "classnames";

import "./chevron-icon.css";

const ChevronIcon = ({ direction = "down", className = "" }) => {
	const classNames = cn("chevron-icon", `chevron-icon--${direction}`, className);

	return <Chevron className={classNames} />;
};

ChevronIcon.propTypes = {
	className: PropTypes.string,
	direction: PropTypes.oneOf(["down", "top", "left", "right"]),
};

export default ChevronIcon;
