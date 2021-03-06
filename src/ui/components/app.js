import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

import "./common/styles.css";
import "./layout.css";

import Header from "./header";
import Footer from "./footer";
import AppRoutesConfig, { Route } from "../routes/routes";
import Loader from "./loader/loader";
import DevelopmentTools from "./development-tools";

@inject("appStore")
@withRouter
@observer
class App extends Component {
	static propTypes = {
		appStore: PropTypes.shape({
			startTimeWatcher: PropTypes.func.isRequired,
			stopTimeWatcher: PropTypes.func.isRequired,
			hasPendingTasks: PropTypes.bool.isRequired,
			isUserAuthenticated: PropTypes.bool.isRequired,
			isUserAdmin: PropTypes.bool.isRequired,
			isProduction: PropTypes.bool.isRequired,
		}).isRequired,
	};

	componentDidMount() {
		this.props.appStore.startTimeWatcher();
	}

	componentWillUnmount() {
		this.props.appStore.stopTimeWatcher();
	}

	render() {
		const { appStore } = this.props;
		const { hasPendingTasks, isUserAuthenticated, isUserAdmin, isProduction } = appStore;

		return (
			<>
				{hasPendingTasks && <Loader />}
				<div className="layout">
					{!isProduction && <DevelopmentTools />}
					<Header className="layout__header" />
					<main className="layout__main colors--very-light-grey">
						{AppRoutesConfig.map(route => (
							<Route
								key={route.id}
								isAuthenticated={isUserAuthenticated}
								isCurrentUserAdmin={isUserAdmin}
								{...route}
							/>
						))}
					</main>
					<Footer className="layout__footer" />
				</div>
			</>
		);
	}
}

export default App;
