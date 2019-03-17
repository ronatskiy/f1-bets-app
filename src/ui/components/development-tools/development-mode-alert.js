import React from "react";
import { inject } from "mobx-react";

import { Col, Container, Row } from "../../../vendors";

import { prettifyDate, prettifyDateWithSeconds } from "../../../helpers/prettify-date";

const DevelopmentModeAlert = ({ pendingTasksCount, qualificationStartTime, isBetsAllowed, currentTime }) => {
	return (
		<Container className="text-center bg-secondary">
			<Row>
				<Col>DEVELOPMENT MODE ON!!!</Col>
				<Col className={isBetsAllowed ? "bg-success" : "bg-warning"}>
					Is Bets Allowed: {isBetsAllowed.toString()}
				</Col>
				<Col>{pendingTasksCount}</Col>
				<Col>Qualification start Time: {prettifyDate(qualificationStartTime)}</Col>
				<Col>Current Time: {prettifyDateWithSeconds(currentTime)}</Col>
			</Row>
		</Container>
	);
};

export default inject(stores => ({
	pendingTasksCount: stores.appStore._appModel._operationManager.pendingTasksCount,
	qualificationStartTime: stores.appStore.nextRace && stores.appStore.nextRace.qualifyingStartTime,
	isBetsAllowed: stores.appStore.isBetsAllowed,
	currentTime: stores.appStore.currentTime,
}))(DevelopmentModeAlert);
