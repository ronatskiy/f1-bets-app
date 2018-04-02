import React from "react";
import PropTypes from "prop-types";

import NationalizedLink from "../../../components/nationalized-link";
import TeamsStanding from "../models/team-standing";
import { Table } from "reactstrap";
import "./team-standing-table.css";

class TeamStandingTable extends React.Component {
	static propTypes = {
		teams: PropTypes.instanceOf(TeamsStanding).isRequired,
	};

	render() {
		return (
			<Table responsive>
				<thead className="thead-light">
					<tr className="text-uppercase">
						<th>Поз</th>
						<th />
						<th className="text-left">Команда</th>
						<th>Очки</th>
					</tr>
				</thead>
				<tbody>
					{this.props.teams.map(team => {
						const { pos, name, url, id, points, nationality } = team;

						return (
							<tr key={id}>
								<td>{pos}</td>
								<td className="text-right">
									<img className="team-car-photo" src={"/images/cars/" + id + ".jpg"} alt={name} />
								</td>
								<td>
									<NationalizedLink text={name} nationality={nationality} url={url} />
								</td>

								<td>{points}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		);
	}
}

export default TeamStandingTable;
