import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import NavBar from "./components/nav-bar/index";
import NextRaceNotifier from "./components/next-race-notifier/next-race-notifier";
import { Race } from "../../../../storage";

import "./styles.css";

class Header extends Component {
	static propTypes = {
		nextRace: PropTypes.instanceOf(Race),
	};

	render() {
		const { nextRace } = this.props;

		return (
			<Fragment>
				<NavBar />
				<NextRaceNotifier nextRace={nextRace} />
			</Fragment>
		);
	}
}

export default Header;
