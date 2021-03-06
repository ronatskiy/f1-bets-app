import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Col, Container, Row } from "../../../vendors";

import CalendarTable from "./components/calendar-table";
import RaceViewModel from "./models/race-view-model";

@inject("calendarPageStore")
@observer
class CalendarPage extends React.Component {
	static propTypes = {
		calendarPageStore: PropTypes.shape({
			races: PropTypes.arrayOf(PropTypes.instanceOf(RaceViewModel)).isRequired,
			nextRace: PropTypes.instanceOf(RaceViewModel),
			isRaceWeekend: PropTypes.bool.isRequired,
			currentSeason: PropTypes.string.isRequired,
		}).isRequired,
	};

	render() {
		const {
			/** @types {RaceViewModel[]} */ races,
			nextRace,
			isRaceWeekend,
			currentSeason,
		} = this.props.calendarPageStore;

		return (
			<Container tag="section" className="section">
				<Row>
					<Col>
						<h1 className="page-title">Календарь гонок сезона {currentSeason} года</h1>
					</Col>
				</Row>

				<Row>
					<Col>
						<CalendarTable races={races} nextRace={nextRace} isRaceWeekend={isRaceWeekend} />
					</Col>
				</Row>
			</Container>
		);
	}
}

export default CalendarPage;
