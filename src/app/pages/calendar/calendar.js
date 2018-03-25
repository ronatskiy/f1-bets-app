import React from "react";
import { Badge, Col, Container, Row, Table } from "reactstrap";
import { prettifyDate } from "../../utilities";
import { inject, observer } from "mobx-react";

@inject(stores => ({
	races: stores.rootStore.racesStore.races,
	nextRace: stores.rootStore.racesStore.nextRace,
	isRaceWeekend: !stores.rootStore.appStore.isBetsAllowed,
}))
@observer
class CalendarPage extends React.Component {
	render() {
		const { races, nextRace, isRaceWeekend } = this.props;

		return races ? (
			<Container tag="section" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
				<Row>
					<Col>
						<h1 className="page-title">Календарь гонок сезона 2018 года</h1>
					</Col>
				</Row>
				<Row>
					<Col>
						<Table size="sm">
							<thead className="thead-light">
								<tr>
									<th>Grand Prix</th>
									<th>Date</th>
								</tr>
							</thead>
							<tbody>
								{races.map(race => {
									const { id, title, location, raceStartTime, qualifyingStartTime } = race;

									return (
										<tr key={id}>
											<td>
												{title}, {location}{" "}
												{id === nextRace.id && (
													<Badge color="info">{isRaceWeekend ? "Now" : "Next"}</Badge>
												)}
											</td>
											<td>
												<div>Qual: {prettifyDate(qualifyingStartTime)}</div>
												<div>Race: {prettifyDate(raceStartTime)}</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		) : null;
	}
}

export default CalendarPage;
