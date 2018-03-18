import React from "react";
import PropTypes from "prop-types";
import kebabCase from "lodash.kebabcase";
import { inject, observer } from "mobx-react/index";
import { Col, Container, Row, Table } from "reactstrap";

import { Team } from "../../../storage";

@inject(stores => ({
	teams: stores.rootStore.teamsStore.teams,
}))
@observer
class TeamsList extends React.Component {
	static propTypes = {
		racers: PropTypes.arrayOf(PropTypes.instanceOf(Team)).isRequired,
	};

	render() {
		return (
			<Container>
				<Row>
					<Col>
						<h1 className="page-title">Список команд сезона 2018</h1>
						<Table>
							<thead className="thead-light">
								<tr>
									<th>Название</th>
									<th>Мотор</th>
									<th>Пилоты</th>
									<th>Очки</th>
								</tr>
							</thead>
							<tbody>
								{this.props.teams.map(team => {
									const { name, powerUnit, drivers, points } = team;

									return (
										<tr key={kebabCase(name)}>
											<td>{name}</td>
											<td>{powerUnit}</td>
											<td>
												{drivers[0].shortName} & {drivers[1].shortName}
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
