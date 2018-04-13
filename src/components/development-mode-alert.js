import React from "react";
import moment from "moment";
import { Col, Container, Row } from "reactstrap";
import { inject, observer } from "mobx-react";

import { prettifyDate } from "./helpers/prettify-date";

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
						Is Bets Allowed: {isBetsAllowed && isBetsAllowed.toString()}
					</Col>
					<Col>Current Time: {moment(currentTime).format("D MMMM YYYY, HH:mm:ss")}</Col>
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
