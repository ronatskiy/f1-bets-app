import React from "react";
import PropTypes from "prop-types";
import { inject, PropTypes as MobxPropTypes } from "mobx-react";
import { Col, Container, Row } from "../../../vendor";

import RacerStanding from "./models/racer-standing";
import RacerStandingTable from "./components/racer-standing-table";

@inject(stores => ({
	racerStandingList: stores.racerStandingsPageStore.racerStandingList,
	currentSeason: stores.racerStandingsPageStore.currentSeason,
	loadRacerStandings: stores.racerStandingsPageStore.loadRacerStandings,
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
			<Container>
				<Row>
					<Col>
						<h1 className="page-title">Турнирная таблица пилотов сезона {currentSeason}</h1>
						<RacerStandingTable racers={racerStandingList.slice()} />
					</Col>
				</Row>
			</Container>
		);
	}
}

export default RacersList;
