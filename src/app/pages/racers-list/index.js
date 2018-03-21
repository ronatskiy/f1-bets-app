import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Col, Container, Row, Table } from "reactstrap";
import { Racer } from "../../../storage";
import { PropTypes as MobxPropTypes } from "mobx-react/index";

@inject(stores => ({
	racers: stores.rootStore.racerStore.racers,
}))
@observer
class RacersList extends React.Component {
	static propTypes = {
		racers: MobxPropTypes.observableArrayOf(PropTypes.instanceOf(Racer)).isRequired,
	};
	render() {
		const { racers } = this.props;

		return (
			<Container>
				<Row>
					<Col>
						<h1 className="page-title">Список пилотов сезона 2018</h1>
						<Table>
							<thead className="thead-light">
								<tr>
									<th>First Name</th>
									<th>Last Name</th>
									<th>ABBR</th>
									<th>Number</th>
									<th>Очки</th>
								</tr>
							</thead>
							<tbody>
								{racers.map(({ firstName, lastName, number, abbreviation, points }) => {
									return (
										<tr key={abbreviation}>
											<td>{firstName}</td>
											<td>{lastName}</td>
											<td>{abbreviation}</td>
											<td>{number}</td>
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
