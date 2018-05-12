import React from "react";
import PropTypes from "prop-types";
import { inject, observer, PropTypes as MobxPropTypes } from "mobx-react";
import { Col, Container, Row } from "../../vendor";

import RacerStanding from "./models/racer-standing";
import RacerStandingTable from "./components/racer-standing-table";

@inject(stores => ({
	racerStandingList: stores.racerStandingsPageStore.racerStandingList,
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
						<RacerStandingTable racers={racerStandingList.slice()} />
					</Col>
				</Row>
			</Container>
		);
	}
}

export default RacersList;
