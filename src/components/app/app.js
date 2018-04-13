import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

import "../common/styles.css";
import "../layout/layout.css";

import Header from "../layout/header";
import Footer from "../layout/footer";
import AppRoutesConfig, { Route } from "../../routes/routes";
import DevelopmentModeAlert from "../development-mode-alert";
import Loader from "../loader/loader";

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
			<div className="layout">
				{!isProduction && <DevelopmentModeAlert />}
				{hasPendingTasks && <Loader />}

				<Header className="layout__header" />
				<main className="layout__main">
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
		);
	}
}

export default App;
