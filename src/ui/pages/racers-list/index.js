import React from "react";
import PropTypes from "prop-types";
import { inject, PropTypes as MobxPropTypes } from "mobx-react";
import { Col, Container, Row } from "../../../vendors";

import RacerStanding from "./models/racer-standing";
import RacerStandingTable from "./components/racer-standing-table";

@inject(({ racerStandingsPageStore }) => ({
	racerStandingList: racerStandingsPageStore.racerStandingList,
	currentSeason: racerStandingsPageStore.currentSeason,
	loadRacerStandings: racerStandingsPageStore.loadRacerStandings,
}))
class RacersList extends React.Component {
	static propTypes = {
		racerStandingList: MobxPropTypes.observableArrayOf(PropTypes.instanceOf(RacerStanding)).isRequired,
		currentSeason: PropTypes.string.isRequired,
		loadRacerStandings: PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.props.loadRacerStandings();
	}

	render() {
		const { racerStandingList, currentSeason } = this.props;

		return (
			<Container className="page">
				<Row>
					<Col>
						<h1 className="page-title">Турнирная таблица пилотов сезона {currentSeason} года</h1>
						<RacerStandingTable racers={racerStandingList.slice()} />
					</Col>
				</Row>
			</Container>
		);
	}
}

export default RacersList;
