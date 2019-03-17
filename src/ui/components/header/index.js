import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import NavigationBar from "./components/navigation-bar";
import NextRaceNotifier from "./components/next-race-notifier/next-race-notifier";
import HeaderStore from "../../stores/header";

@inject("headerStore")
@observer
class Header extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		headerStore: PropTypes.instanceOf(HeaderStore),
	};

	static defaultProps = {
		className: "",
	};

	render() {
		const { headerStore, className } = this.props;
		const { nextRace, currentTimeUtcString } = headerStore;

		return (
			<header className={className}>
				<NavigationBar />
				<section className="alert-info">
					{nextRace && (
						<NextRaceNotifier
							nextRaceTitle={nextRace.prettyTitle}
							nextRaceStartTime={nextRace.raceStartTime}
							currentTimeUtcString={currentTimeUtcString}
						/>
					)}
				</section>
			</header>
		);
	}
}

export default Header;
