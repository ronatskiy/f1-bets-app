import React from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "reactstrap";

import PrimaryButton from "../../../../components/common/primary-button";
import WeekendInfoModel from "../../models/weekend-info-model/index";
import "./race-info-panel.css";
import TextLink from "../../../../components/common/text-link";
import CountryInfo from "./country-info";

class RaceInfoPanel extends React.Component {
	static propTypes = {
		raceInfo: PropTypes.instanceOf(WeekendInfoModel).isRequired,
		commandButton: PropTypes.any,
	};

	static defaultProps = {
		commandButton: () => <PrimaryButton>Подробнее</PrimaryButton>,
	};

	render() {
		const { raceInfo, commandButton: CommandButton } = this.props;
		const {
			flagUrl,
			countryName,
			raceTitle,
			weekendInterval,
			practices,
			qualification,
			race,
			circuitUrl,
			raceUrl,
		} = raceInfo;

		return (
			<Container className="race-info-panel">
				<Row>
					<Col xs={12}>
						<CountryInfo
							className="race-info-panel__country-info"
							countryName={countryName}
							flagUrl={flagUrl}
							countryUrl={circuitUrl}
						/>
						<TextLink target="_blank" href={raceUrl} className="race-info-panel__grand-prix-title">
							{raceTitle}
						</TextLink>
					</Col>
				</Row>
				<Row>
					<Col className="race-info-panel__weekend-interval">{weekendInterval}</Col>
				</Row>
				<Row className="justify-content-around section race-info-panel__weekend-schedule">
					<Col className="race-info-panel__practice-list" md={5}>
						{practices.map(({ title, day, timeInterval }) => (
							<Row className="race-info-panel__stage-info" key={title.split(" ").join("_")}>
								<Col xs={5}>{title}</Col>
								<Col xs={2}>{day.toUpperCase()}</Col>
								<Col>{timeInterval}</Col>
							</Row>
						))}
					</Col>
					<Col className="race-info-panel__race-description" md={5}>
						<Row className="race-info-panel__stage-info">
							<Col xs={5}>{qualification.title}</Col>
							<Col xs={2}>{qualification.day.toUpperCase()}</Col>
							<Col>{qualification.timeInterval}</Col>
						</Row>
						<Row className="race-info-panel__stage-info">
							<Col xs={5}>{race.title}</Col>
							<Col xs={2}>{race.day.toUpperCase()}</Col>
							<Col>{race.timeInterval}</Col>
						</Row>
					</Col>
				</Row>
				<Row>
					<Col>
						<CommandButton />
					</Col>
				</Row>
			</Container>
		);
	}
}

export default RaceInfoPanel;
