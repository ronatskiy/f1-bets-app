import React from "react";
import moment from "moment";
import { Col, Container, Row } from "reactstrap";
import { inject, observer } from "mobx-react";

import { prettifyDate } from "../../utilities";

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
					<Col>Current Time: {moment(currentTime).format("D MMMM YYYY, HH:mm:ss")}</Col>
				</Row>
			</Container>
		</Row>
	);
};

export default inject(stores => ({
	pendingTasksCount: stores.rootStore.pendingTasksCount,
	qualificationStartTime:
		stores.rootStore.racesStore.nextRace && stores.rootStore.racesStore.nextRace.qualifyingStartTime,
	isBetsAllowed: stores.rootStore.appStore.isBetsAllowed,
	currentTime: stores.rootStore.appStore.currentTime,
}))(observer(DevelopmentModeAlert));
