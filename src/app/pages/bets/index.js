import React from "react";

import { Col, Container, Row } from "reactstrap";
import { observer, inject } from "mobx-react";

import BetsForm from "./components/bets-form";

const BetsPage = ({ racers, currentUser, onBetsSubmit }) => (
	<Container>
		<Row>
			<Col>
				<h1 className="page-title">Делайте Ваши ставки!</h1>
			</Col>
		</Row>
		<Row>
			<Col>
				<BetsForm racers={racers} user={currentUser} onBetsSubmit={onBetsSubmit} />
			</Col>
		</Row>
	</Container>
);

export default inject(stores => ({
	racers: stores.rootStore.racerStore.racers,
	currentUser: stores.rootStore.sessionStore.currentUser,
	onBetsSubmit: async bets => {
		await stores.rootStore.racesStore.addNewBets(bets);
	},
}))(observer(BetsPage));
