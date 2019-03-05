import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SmartNavLink = ({ path = "/", className = "", disabled = false, children }) => {
	return !disabled ? (
		<Link to={path} className={className}>
			{children}
		</Link>
	) : (
		children
	);
};

SmartNavLink.propTypes = {
	path: PropTypes.string,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	children: PropTypes.node.isRequired,
};

export default SmartNavLink;
