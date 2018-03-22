import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

import "./components/layout/layout.css";

import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

import { Race } from "../storage";
import AppRoutesConfig, { Route } from "./routes/routes";
import { Col, Row } from "reactstrap";

@inject(stores => {
	const { sessionStore, racesStore, appStore } = stores.rootStore;
	return {
		nextRace: racesStore.nextRace,
		isAuthenticated: sessionStore.isAuthenticated,
		isCurrentUserAdmin: sessionStore.isCurrentUserAdmin,
		isProduction: appStore.isProduction,
	};
})
@withRouter
@observer
class App extends Component {
	static propTypes = {
		nextRace: PropTypes.instanceOf(Race),
		isAuthenticated: PropTypes.bool,
		isCurrentUserAdmin: PropTypes.bool,
		isProduction: PropTypes.bool,
	};

	static defaultProps = {
		nextRace: null,
		isAuthenticated: false,
		isCurrentUserAdmin: false,
		isProduction: true,
	};

	render() {
		const { isAuthenticated, nextRace, isCurrentUserAdmin, isProduction } = this.props;

		return (
			<div className="layout">
				<header className="layout__header">
					<Header nextRace={nextRace} />
				</header>
				{!isProduction && (
					<Row className="text-center bg-danger">
						<Col>DEVELOPMENT MODE ON!!!</Col>
					</Row>
				)}
				<main className="layout__main">
					{AppRoutesConfig.map(route => (
						<Route
							key={route.id}
							isAuthenticated={isAuthenticated}
							isCurrentUserAdmin={isCurrentUserAdmin}
							{...route}
						/>
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
