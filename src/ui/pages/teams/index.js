import React from "react";
import PropTypes from "prop-types";
import { inject, PropTypes as MobxPropTypes } from "mobx-react";
import { Col, Container, Row } from "../../../vendor";

import TeamsStanding from "./models/team-standing";
import TeamStandingTable from "./components/team-standing-table";

@inject(stores => ({
	teamsStandingList: stores.teamsStandingsPageStore.teamsStandingList,
	currentSeason: stores.teamsStandingsPageStore.currentSeason,
	fetchStandings: stores.teamsStandingsPageStore.fetchStandings,
}))
class TeamsList extends React.Component {
	static propTypes = {
		teamsStandingList: MobxPropTypes.observableArrayOf(PropTypes.instanceOf(TeamsStanding)).isRequired,
		currentSeason: PropTypes.string.isRequired,
		fetchStandings: PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.props.fetchStandings();
	}

	render() {
		const { currentSeason } = this.props;
		return (
			<Container>
				<Row>
					<Col>
						<h1 className="page-title">Турнирная таблица команд сезона {currentSeason}</h1>
						<TeamStandingTable teams={this.props.teamsStandingList.slice()} currentSeason={currentSeason} />
					</Col>
				</Row>
			</Container>
		);
	}
}

export default TeamsList;
