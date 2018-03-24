import React from "react";
import { Col, Container, Row } from "reactstrap";
import { observer, inject } from "mobx-react";

import BetsForm from "./components/bets-form";

const BetsPage = ({ racers, currentUser, onBetsSubmit, isBetsAllowed, nextRaceTitle }) => (
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
						Сейчас прогнозы на {nextRaceTitle} уже не принимаются.<br />Нова возможность оставить свой
						прогноз на будущую гонку у Вас появится после начала этой.
					</div>
				) : (
					<BetsForm racers={racers} user={currentUser} onBetsSubmit={onBetsSubmit} />
				)}
			</Col>
		</Row>
	</Container>
);

export default inject(stores => ({
	isBetsAllowed: stores.rootStore.appStore.isBetsAllowed,
	nextRaceTitle: stores.rootStore.racesStore.nextRace && stores.rootStore.racesStore.nextRace.prettyTitle,
	racers: stores.rootStore.racerStore.racers,
	currentUser: stores.rootStore.sessionStore.currentUser,
	onBetsSubmit: async bets => {
		await stores.rootStore.racesStore.addNewBet(bets);
	},
}))(observer(BetsPage));
