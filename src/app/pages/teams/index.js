import React from "react";
import PropTypes from "prop-types";
import { inject, observer, PropTypes as MobxPropTypes } from "mobx-react/index";
import { Col, Container, Row, Table } from "reactstrap";
import { TeamsStanding } from "./stores/teams-standings-store";

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
						<Table>
							<thead className="thead-light">
								<tr>
									<th>Поз</th>
									<th>Название</th>
									<th>Очки</th>
								</tr>
							</thead>
							<tbody>
								{this.props.teamsStandingList.map(team => {
									const { pos, name, url, constructorId, points } = team;

									return (
										<tr key={constructorId}>
											<td>{pos}</td>
											<td>
												<a target="_blank" href={url}>
													{name}
												</a>
											</td>
											<td>{points}</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default TeamsList;
