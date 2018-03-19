import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";
import { pathNames } from "./routes";

const SmartRoute = ({
	component,
	isAuthenticated = false,
	isCurrentUserAdmin = false,
	isPrivate = false,
	onlyForAdmins = false,
	...rest
}) => {
	const Component = component;

	return (
		<Route
			{...rest}
			render={props => {
				if (onlyForAdmins && !isCurrentUserAdmin) {
					return (
						<Redirect
							to={{
								pathname: pathNames.HOME,
							}}
						/>
					);
				}

				if (isPrivate && !isAuthenticated) {
					return (
						<Redirect
							to={{
								pathname: pathNames.LOGIN,
								state: { from: props.location },
							}}
						/>
					);
				}
				return <Component {...rest} />;
			}}
		/>
	);
};

SmartRoute.propTypes = {
	onlyForAdmins: PropTypes.bool,
	isPrivate: PropTypes.bool,
	isAuthenticated: PropTypes.bool.isRequired,
	isCurrentUserAdmin: PropTypes.bool.isRequired,
};

export default SmartRoute;
