import React from "react";
import PropTypes from "prop-types";
import { Table } from "../../../../vendors";

import NationalizedLink from "../../../components/nationalized-link";
import TeamsStanding from "../models/team-standing";
import "./team-standing-table.css";

class TeamStandingTable extends React.Component {
	static propTypes = {
		teams: PropTypes.arrayOf(PropTypes.instanceOf(TeamsStanding)).isRequired,
		currentSeason: PropTypes.string.isRequired,
	};

	render() {
		const { currentSeason, teams } = this.props;

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
					{teams.map(team => {
						const { pos, name, url, id, points, nationality } = team;

						return (
							<tr key={id}>
								<td>{pos}</td>
								<td className="text-right">
									<img
										className="team-car-photo"
										src={`/images/cars/${currentSeason}/${id}.png`}
										alt={name}
									/>
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
