import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import { pathNames } from "../../routes/routes";
import Race from "../../domain/race";
import NextRaceIntro from "./components/next-race-intro";

@inject("homePageStore")
@withRouter
@observer
class HomePage extends Component {
	static propTypes = {
		homePageStore: PropTypes.shape({
			isBetsAllowed: PropTypes.bool.isRequired,
			nextRace: PropTypes.instanceOf(Race),
		}).isRequired,
	};

	handleBetButtonClick = () => {
		this.props.history.push(pathNames.BETS);
	};

	render() {
		const { nextRace = null, isBetsAllowed } = this.props.homePageStore;

		return (
			<Container className="home-page">
				<Row>
					<Col>
						{nextRace && (
							<NextRaceIntro
								nextRace={nextRace}
								isBetsAllowed={isBetsAllowed}
								onBetButtonClick={this.handleBetButtonClick}
							/>
						)}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default HomePage;
