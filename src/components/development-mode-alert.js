import React from "react";
import { Col, Container, Row } from "reactstrap";
import { inject, observer } from "mobx-react";

import { prettifyDate, prettifyDateWithSeconds } from "../helpers/prettify-date";

const DevelopmentModeAlert = ({ pendingTasksCount, qualificationStartTime, isBetsAllowed, currentTime }) => {
	return (
		<Row className="text-center bg-danger">
			<Container>
				<Row>
					<Col>DEVELOPMENT MODE ON!!!</Col>
					<Col>{pendingTasksCount}</Col>
				</Row>
				<Row className="text-left">
					<Col>Qualification start Time: {prettifyDate(qualificationStartTime)}</Col>
					<Col className={isBetsAllowed ? "bg-success" : "bg-warning"}>
						Is Bets Allowed: {isBetsAllowed.toString()}
					</Col>
					<Col>Current Time: {prettifyDateWithSeconds(currentTime)}</Col>
				</Row>
			</Container>
		</Row>
	);
};

export default inject(stores => ({
	pendingTasksCount: stores.appStore._appViewModel._worker.pendingTasksCount,
	qualificationStartTime: stores.appStore.nextRace && stores.appStore.nextRace.qualifyingStartTime,
	isBetsAllowed: stores.appStore.isBetsAllowed,
	currentTime: stores.appStore.currentTime,
}))(observer(DevelopmentModeAlert));
