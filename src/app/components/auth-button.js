import React from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react/index";

const AuthButton = ({ history, isAuthenticated, signOut }) =>
	isAuthenticated ? (
		<p>
			Welcome!{" "}
			<button
				onClick={() => {
					signOut();
					history.push("/");
				}}
			>
				Sign out
			</button>
		</p>
	) : (
		<p>You are not logged in.</p>
	);

AuthButton.propTypes = {
	history: PropTypes.object.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	signOut: PropTypes.func.isRequired,
};

export default inject(({ rootStore: { sessionStore } }) => ({
	isAuthenticated: sessionStore.isAuthenticated,
	signOut: () => sessionStore.signOut(),
}))(observer(withRouter(AuthButton)));
