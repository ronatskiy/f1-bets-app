import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import NavigationBar from "./components/navigation-bar/index";
import NextRaceNotifier from "./components/next-race-notifier/next-race-notifier";
import Race from "../../domain/race";
import { Container } from "reactstrap";

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
					<Container>
						<NextRaceNotifier nextRace={nextRace} currentTimeUtcString={currentTimeUtcString} />
					</Container>
				)}
			</header>
		);
	}
}

export default Header;
