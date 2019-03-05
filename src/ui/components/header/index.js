import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import NavigationBar from "./components/navigation-bar";
import NextRaceNotifier from "./components/next-race-notifier/next-race-notifier";
import Race from "../../../domain/race";

@inject("headerStore")
@observer
class Header extends React.Component {
	static propTypes = {
		headerStore: PropTypes.shape({
			nextRace: PropTypes.instanceOf(Race),
			currentTimeUtcString: PropTypes.string,
		}).isRequired,
		className: PropTypes.string,
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
				{nextRace && (
					<section className="colors--very-light-green">
						<NextRaceNotifier nextRace={nextRace} currentTimeUtcString={currentTimeUtcString} />
					</section>
				)}
			</header>
		);
	}
}

export default Header;
