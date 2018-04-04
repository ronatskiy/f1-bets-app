import React from "react";
import PropTypes from "prop-types";
import { inject, observer, PropTypes as MobxPropTypes } from "mobx-react/index";
import { Col, Container, Row } from "reactstrap";

import TeamsStanding from "./models/team-standing";
import TeamStandingTable from "./components/team-standing-table";

@inject(stores => ({
	teamsStandingList: stores.rootStore.teamsStandingsStore.teamsStandingList,
}))
@observer
class TeamsList extends React.Component {
	static propTypes = {
		teamsStandingList: MobxPropTypes.observableArrayOf(PropTypes.instanceOf(TeamsStanding)).isRequired,
	};

	render() {
		return (
			<Container>
				<Row>
					<Col>
						<h1 className="page-title">Турнирная таблица команд сезона 2018</h1>
						<TeamStandingTable teams={this.props.teamsStandingList.slice()} />
					</Col>
				</Row>
			</Container>
		);
	}
}

export default TeamsList;
