import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";
import { pathNames } from "./routes";

const SmartRoute = ({ component, isAuthenticated = false, isPrivate = false, ...rest }) => {
	const Component = component;

	return (
		<Route
			{...rest}
			render={props =>
				isPrivate && !isAuthenticated ? (
					<Redirect
						to={{
							pathname: pathNames.LOGIN,
							state: { from: props.location },
						}}
					/>
				) : (
					<Component {...rest} />
				)
			}
		/>
	);
};

SmartRoute.propTypes = {
	isPrivate: PropTypes.bool,
	isAuthenticated: PropTypes.bool.isRequired,
};

export default SmartRoute;
