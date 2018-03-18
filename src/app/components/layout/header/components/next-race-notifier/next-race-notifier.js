import React from "react";
import PropTypes from "prop-types";
import { Col, Container, Row, UncontrolledTooltip } from "reactstrap";

import CountdownTimer from "../countdown-timer/index";
import { prettifyDate } from "../../../../../utilities";
import { Race } from "../../../../../../storage";
import "./styles.css";

class NextRaceNotifier extends React.Component {
	static propTypes = {
		nextRace: PropTypes.instanceOf(Race),
	};

	render() {
		const { nextRace } = this.props;

		return nextRace ? (
			<Container>
				<Row className="alert alert-info next-race-notifier">
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
						<CountdownTimer className="next-race-notifier__countdown-timer" time={nextRace.raceStartTime} />
					</Col>
				</Row>
			</Container>
		) : null;
	}
}

export default NextRaceNotifier;
