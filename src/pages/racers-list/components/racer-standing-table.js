import React from "react";
import PropTypes from "prop-types";
import { Table } from "../../../vendor";

import NationalizedLink from "../../../components/nationalized-link";
import RacerStanding from "../models/racer-standing";

class RacerStandingTable extends React.Component {
	static propTypes = {
		racers: PropTypes.arrayOf(PropTypes.instanceOf(RacerStanding)).isRequired,
	};

	render() {
		const { racers } = this.props;

		return (
			<Table responsive>
				<thead className="thead-light">
					<tr className="text-uppercase">
						<th>поз</th>
						<th className="text-right">Ном</th>
						<th className="text-left">Гонщик</th>
						<th className="text-left">Конструктор</th>
						<th>Очки</th>
					</tr>
				</thead>
				<tbody>
					{racers.map(
						(
							{
								racerFullName,
								racerUrl,
								racerId,
								racerNumber,
								constructorName,
								constructorUrl,
								racerPoints,
								racerNationality,
							},
							index,
						) => {
							return (
								<tr key={racerId}>
									<td>{index + 1}</td>
									<td className="text-right">{racerNumber}</td>
									<td>
										<NationalizedLink
											text={racerFullName}
											url={racerUrl}
											nationality={racerNationality}
										/>
									</td>
									<td>
										<a target="_blank" rel="noopener noreferrer" href={constructorUrl}>
											{constructorName}
										</a>
									</td>
									<td>{racerPoints}</td>
								</tr>
							);
						},
					)}
				</tbody>
			</Table>
		);
	}
}

export default RacerStandingTable;
