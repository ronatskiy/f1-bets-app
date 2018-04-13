import React from "react";
import PropTypes from "prop-types";

import NavBar from "./components/nav-bar/index";
import NextRaceNotifier from "./components/next-race-notifier/next-race-notifier";
import Race from "../../../domain/race";

import "./styles.css";
import { inject, observer } from "mobx-react";

@inject(stores => ({
	nextRace: stores.appStore.nextRace,
}))
@observer
class Header extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		nextRace: PropTypes.instanceOf(Race),
	};

	static defaultProps = {
		className: "",
	};

	render() {
		const { nextRace, className } = this.props;

		return (
			<header className={className}>
				<NavBar />
				<NextRaceNotifier nextRace={nextRace} />
			</header>
		);
	}
}

export default Header;
