import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SmartNavLink = ({ path = "/", className = "", disabled = false, onClick, children }) => {
	return !disabled ? (
		<Link to={path} className={className} onClick={onClick}>
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
	onClick: PropTypes.func,
	children: PropTypes.node.isRequired,
};

export default SmartNavLink;
