import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";
import { URL_ROUTES } from "./url-routes";

const SmartRoute = ({
	component: Component,
	isAuthenticated = false,
	isCurrentUserAdmin = false,
	isPrivate = false,
	onlyForAdmins = false,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={props => {
				if (onlyForAdmins && !isCurrentUserAdmin) {
					return (
						<Redirect
							to={{
								pathname: URL_ROUTES.HOME,
							}}
						/>
					);
				}

				if (isPrivate && !isAuthenticated) {
					return (
						<Redirect
							to={{
								pathname: URL_ROUTES.LOGIN,
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
