import React from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "reactstrap";
import { observer, inject, PropTypes as MobXPropTypes } from "mobx-react";

import BetsForm from "./components/bets-form";
import Racer from "../../domain/racer";
import User from "../../domain/user";

const BetsPage = ({ betPageStore: { racers, currentUser, onBetsSubmit, isBetsAllowed, nextRaceTitle } }) => (
	<Container>
		<Row>
			<Col>
				<h1 className="page-title">{isBetsAllowed ? "Делайте Ваши прогнозы!" : "Прогнозы не принимаются."}</h1>
			</Col>
		</Row>
		<Row>
			<Col>
				{!isBetsAllowed ? (
					<div className="alert alert-warning" role="alert">
						Сейчас прогнозы на {nextRaceTitle} уже не принимаются.<br />Новая возможность оставить свой
						прогноз на будущую гонку у Вас появится после начала этой.
					</div>
				) : (
					<BetsForm racers={racers} user={currentUser} onBetsSubmit={onBetsSubmit} />
				)}
			</Col>
		</Row>
	</Container>
);

BetsPage.propTypes = {
	betPageStore: PropTypes.shape({
		racers: MobXPropTypes.observableArrayOf(PropTypes.instanceOf(Racer)),
		currentUser: PropTypes.instanceOf(User),
		onBetsSubmit: PropTypes.func.isRequired,
		isBetsAllowed: PropTypes.bool.isRequired,
		nextRaceTitle: PropTypes.string.isRequired,
	}).isRequired,
};

export default inject("betPageStore")(observer(BetsPage));
