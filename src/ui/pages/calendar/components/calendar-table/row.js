import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import cn from "classnames";
import { Badge } from "../../../../../vendors";

import { extractDate, extractTime } from "../../../../../helpers/prettify-date";
import RaceViewModel from "../../models/race-view-model";
import PseudoLink from "../../../../components/common/pseudo-link";
import ChevronIcon from "../../../../components/common/chevron-icon";

@observer
export default class CalendarTableRow extends React.Component {
	static propTypes = {
		className: PropTypes.string.isRequired,
		race: PropTypes.instanceOf(RaceViewModel),
		isNextRace: PropTypes.bool.isRequired,
		isRaceWeekend: PropTypes.bool.isRequired,
	};

	@observable _isOpen = false;

	@action
	_toggle = () => {
		this._isOpen = !this._isOpen;
	};

	render() {
		const { className, isNextRace, isRaceWeekend, /** @type {RaceViewModel} */ race } = this.props;
		const classNames = cn(className, {
			"calendar-table__row--highlighted": isNextRace,
		});

		return (
			<React.Fragment>
				<tr onClick={this._toggle} className={classNames}>
					<td className="calendar-table__command-column">
						<ChevronIcon direction={this._isOpen ? "right" : "down"} />
					</td>
					<td>
						<PseudoLink>{race.raceName}</PseudoLink>
						{isNextRace && (
							<Badge className="calendar-table__badge" color="info">
								{isRaceWeekend ? "Now" : "Next"}
							</Badge>
						)}
					</td>
					<td className="calendar-table__date-column">
						<PseudoLink>{extractDate(race.raceTime)}</PseudoLink>
					</td>
					<td className="calendar-table__time-column">
						<PseudoLink>{extractTime(race.raceTime)}</PseudoLink>
					</td>
				</tr>
				{this._isOpen && (
					<React.Fragment>
						<tr className="calendar-table__row calendar-table__row--nested">
							<td />
							<td>Практика 1</td>
							<td>{extractDate(race.practice1Time)}</td>
							<td>{extractTime(race.practice1Time)}</td>
						</tr>
						<tr className="calendar-table__row calendar-table__row--nested">
							<td />
							<td>Практика 2</td>
							<td>{extractDate(race.practice2Time)}</td>
							<td>{extractTime(race.practice2Time)}</td>
						</tr>
						<tr className="calendar-table__row calendar-table__row--nested">
							<td />
							<td>Практика 3</td>
							<td>{extractDate(race.practice3Time)}</td>
							<td>{extractTime(race.practice3Time)}</td>
						</tr>
						<tr className="calendar-table__row calendar-table__row--nested">
							<td />
							<td>Квалификация</td>
							<td>{extractDate(race.qualTime)}</td>
							<td>{extractTime(race.qualTime)}</td>
						</tr>
					</React.Fragment>
				)}
			</React.Fragment>
		);
	}
}
