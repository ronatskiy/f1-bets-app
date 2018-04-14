import React from "react";
import PropTypes from "prop-types";
import { Col, Row, UncontrolledTooltip } from "reactstrap";

import CountdownTimer from "../countdown-timer/index";
import { prettifyDate } from "../../../../helpers/prettify-date";
import Race from "../../../../domain/race";

import "./next-race-notifier.css";

class NextRaceNotifier extends React.Component {
	static propTypes = {
		nextRace: PropTypes.instanceOf(Race).isRequired,
		currentTimeUtcString: PropTypes.string.isRequired,
	};

	render() {
		const { nextRace, currentTimeUtcString } = this.props;

		return (
			<Row className="next-race-notifier alert-info">
				<Col xs={12} sm={8} md={6} className="next-race-notifier__countdown-title">
					<div>Следующая гонка</div>
					<div>
						<strong className="next-race-notifier__pseudo-link" id="race-info-tooltip">
							{nextRace.title.toUpperCase()}
						</strong>
						<UncontrolledTooltip
							placement="bottom"
							autohide={false}
							target="race-info-tooltip"
							innerClassName="next-race-notifier__race-info-tooltip"
						>
							Начало квалификации: {prettifyDate(nextRace.qualifyingStartTime)}
							<br />
							Начало гонки: {prettifyDate(nextRace.raceStartTime)}
						</UncontrolledTooltip>
					</div>
				</Col>
				<Col xs={12} sm={4} md={6}>
					<CountdownTimer
						className="next-race-notifier__countdown-timer"
						startTime={currentTimeUtcString}
						endTime={nextRace.raceStartTime}
					/>
				</Col>
			</Row>
		);
	}
}

export default NextRaceNotifier;
