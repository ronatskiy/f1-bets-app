import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

import "./components/layout/layout.css";

import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

import { Race, User } from "../storage";
import AppRoutesConfig, { Route } from "./routes/routes";

@inject(({ rootStore }) => {
	const { sessionStore, racesStore } = rootStore;
	return {
		nextRace: racesStore.nextRace,
		isAuthenticated: sessionStore.isAuthenticated,
	};
})
@withRouter
@observer
class App extends Component {
	static propTypes = {
		currentUser: PropTypes.instanceOf(User),
		nextRace: PropTypes.instanceOf(Race),
		isAuthenticated: PropTypes.bool.isRequired,
	};

	render() {
		const { isAuthenticated, nextRace } = this.props;

		return (
			<div className="layout">
				<header className="layout__header">
					<Header nextRace={nextRace} />
				</header>
				<main className="layout__main">
					{AppRoutesConfig.map(route => (
						<Route key={route.id} isAuthenticated={isAuthenticated} {...route} />
					))}
				</main>
				<div className="layout__footer">
					<Footer />
				</div>
			</div>
		);
	}
}

export default App;
