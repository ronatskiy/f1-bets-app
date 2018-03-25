import React from "react";
import PropTypes from "prop-types";
import { Col, Container, Row, Table } from "reactstrap";
import { inject, observer, PropTypes as MobxPropTypes } from "mobx-react";

import { RacerStanding } from "./stores/racer-standings-store";

@inject(stores => ({
	racerStandingList: stores.rootStore.racerStandingsStore.racerStandingList,
}))
@observer
class RacersList extends React.Component {
	static propTypes = {
		racerStandingList: MobxPropTypes.observableArrayOf(PropTypes.instanceOf(RacerStanding)).isRequired,
	};
	render() {
		const { racerStandingList } = this.props;

		return (
			<Container>
				<Row>
					<Col>
						<h1 className="page-title">Турнирная таблица пилотов сезона 2018</h1>
						<Table>
							<thead className="thead-light">
								<tr className="text-uppercase">
									<th>Поз</th>
									<th>Имя</th>
									<th>Номер</th>
									<th>Очки</th>
								</tr>
							</thead>
							<tbody>
								{racerStandingList.map(({ pos, fullName, racerUrl, permanentNumber, code, points }) => {
									return (
										<tr key={code}>
											<td>{pos}</td>
											<td>
												<a target="_blank" href={racerUrl}>
													{fullName}
												</a>
											</td>
											<td>{permanentNumber}</td>
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

export default RacersList;
