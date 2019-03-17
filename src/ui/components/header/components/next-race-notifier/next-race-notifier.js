import React from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "../../../../../vendors";
import CountdownTimer from "../countdown-timer";

import "./next-race-notifier.css";

class NextRaceNotifier extends React.Component {
	static propTypes = {
		nextRaceTitle: PropTypes.string.isRequired,
		nextRaceStartTime: PropTypes.string.isRequired,
		currentTimeUtcString: PropTypes.string.isRequired,
	};

	render() {
		const { nextRaceStartTime, nextRaceTitle, currentTimeUtcString } = this.props;

		return (
			<Container className="next-race-notifier alert-info">
				<Row>
					<Col xs={12} sm={8} md={8} className="next-race-notifier__race-info">
						До старта гонки
						<strong className="next-race-notifier__race-title">{nextRaceTitle}</strong>
					</Col>

					<Col xs={12} sm={4} md={4}>
						<CountdownTimer
							className="next-race-notifier__countdown-timer"
							startTime={currentTimeUtcString}
							endTime={nextRaceStartTime}
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default NextRaceNotifier;
