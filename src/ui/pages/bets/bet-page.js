import React from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { Col, Container, Row } from "../../../vendors";

import BetsForm from "./components/bets-form";
import Racer from "../../../domain/racer";
import User from "../../../domain/user";

function BetsPage(props) {
	const { racers, currentUser, usersBet, isBetsAllowed, nextRaceTitle, onBetsSubmit } = props;
	const header = isBetsAllowed ? "Делайте Ваши прогнозы!" : "Прогнозы не принимаются.";

	return (
		<Container className="page">
			<Row>
				<Col>
					<h1 className="page-title">{header}</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					{!isBetsAllowed ? (
						<div className="alert alert-warning" role="alert">
							Сейчас прогнозы на {nextRaceTitle} уже не принимаются.
							<br />
							Новая возможность оставить свой прогноз на будущую гонку у Вас появится после начала этой.
						</div>
					) : (
						<BetsForm racers={racers} user={currentUser} usersBet={usersBet} onBetsSubmit={onBetsSubmit} />
					)}
				</Col>
			</Row>
		</Container>
	);
}

BetsPage.propTypes = {
	racers: PropTypes.arrayOf(PropTypes.instanceOf(Racer)).isRequired,
	currentUser: PropTypes.instanceOf(User),
	usersBet: PropTypes.object,
	isBetsAllowed: PropTypes.bool.isRequired,
	nextRaceTitle: PropTypes.string.isRequired,
	onBetsSubmit: PropTypes.func.isRequired,
};

export default inject(({ betPageStore }) => {
	const { racers, currentUser, usersBet, isBetsAllowed, nextRaceTitle } = betPageStore;

	return {
		racers,
		currentUser,
		usersBet,
		isBetsAllowed,
		nextRaceTitle,
		onBetsSubmit: bet => betPageStore.submitBet(bet),
	};
})(BetsPage);
