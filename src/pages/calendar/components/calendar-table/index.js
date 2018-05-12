import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import CalendarTableRow from "./row";
import RaceViewModel from "../../models/race-view-model";

import "./calendar-table.css";

export default class CalendarTable extends React.Component {
	static propTypes = {
		races: PropTypes.arrayOf(PropTypes.instanceOf(RaceViewModel)).isRequired,
		nextRace: PropTypes.instanceOf(RaceViewModel),
		isRaceWeekend: PropTypes.bool.isRequired,
	};
	render() {
		const { /** @types {RaceViewModel[]} */ races, nextRace, isRaceWeekend } = this.props;

		return (
			<Table size="sm" responsive>
				<thead className="thead-light">
					<tr>
						<th className="calendar-table__command-column" />
						<th className="calendar-table__grand-prix-column">Гран При</th>
						<th className="calendar-table__date-column">Дата</th>
						<th className="calendar-table__time-column">Время</th>
					</tr>
				</thead>
				<tbody>
					{races.map(race => (
						<CalendarTableRow
							key={race.raceId}
							className="calendar-table__row calendar-table__row--expandable"
							race={race}
							isNextRace={race.raceId === nextRace.raceId}
							isRaceWeekend={isRaceWeekend}
						/>
					))}
				</tbody>
			</Table>
		);
	}
}
