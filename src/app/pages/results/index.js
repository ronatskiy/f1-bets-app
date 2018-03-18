import React from "react";
import PropTypes from "prop-types";
import { Col, Container, Row, Table } from "reactstrap";
import { inject, observer } from "mobx-react/index";

@inject(stores => ({
	nextRace: stores.rootStore.racesStore.nextRace,
}))
@observer
class ResultsPage extends React.Component {
	render() {
		const { nextRace } = this.props;

		return (
			<Container>
				<Row>
					<Col>
						{nextRace && <h1 className="page-title">Таблица всех прогнозов на {nextRace.prettyTitle}</h1>}
					</Col>
				</Row>
				{nextRace && (
					<Row>
						<Col>
							<BetsResultsTable nextRaceBets={nextRace.bets} />
						</Col>
					</Row>
				)}
			</Container>
		);
	}
}

class BetsResultsTable extends React.Component {
	static propTypes = {
		nextRaceBets: PropTypes.array,
	};

	static defaultProps = {
		nextRaceBets: [],
	};

	renderBets(betsMap, id) {
		return Array(10)
			.fill(1)
			.map((_, index) => (
				<td key={id + index} className="text-center">
					{betsMap[index]}
				</td>
			));
	}

	render() {
		const { nextRaceBets } = this.props;

		return (
			<Table>
				<thead>
					<tr>
						<th>Пользователь</th>
						<th className="text-center">1</th>
						<th className="text-center">2</th>
						<th className="text-center">3</th>
						<th className="text-center">4</th>
						<th className="text-center">5</th>
						<th className="text-center">6</th>
						<th className="text-center">7</th>
						<th className="text-center">8</th>
						<th className="text-center">9</th>
						<th className="text-center">10</th>
					</tr>
				</thead>
				<tbody>
					{nextRaceBets.map(bet => {
						const { userInfo, betsMap } = bet;
						return (
							<tr key={userInfo.id}>
								<td>{userInfo.name}</td>
								{this.renderBets(betsMap, userInfo.id)}
							</tr>
						);
					})}
				</tbody>
			</Table>
		);
	}
}

export default ResultsPage;
