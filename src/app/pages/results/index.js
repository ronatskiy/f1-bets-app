import React from "react";
import PropTypes from "prop-types";
import { Col, Container, Row, Table } from "reactstrap";
import { inject, observer } from "mobx-react/index";
import { User } from "../../../storage";

@inject(stores => ({
	nextRaceTitle: stores.rootStore.resultsPageSrore.nextRaceTitle,
	currentUser: stores.rootStore.resultsPageSrore.currentUser,
	bets: stores.rootStore.resultsPageSrore.bets,
}))
@observer
class ResultsPage extends React.Component {
	render() {
		const { nextRaceTitle, currentUser, bets } = this.props;

		return (
			<Container>
				<Row>
					<Col>
						{nextRaceTitle && <h1 className="page-title">Таблица всех прогнозов на {nextRaceTitle}</h1>}
					</Col>
				</Row>
				<Row>
					<Col>
						<BetsResultsTable nextRaceBets={bets} currentUser={currentUser} />
					</Col>
				</Row>
			</Container>
		);
	}
}

class BetsResultsTable extends React.Component {
	static propTypes = {
		nextRaceBets: PropTypes.array,
		currentUser: PropTypes.instanceOf(User),
	};

	static defaultProps = {
		nextRaceBets: [],
		currentUser: null,
	};

	renderBets(betsMap, id) {
		return Array(10)
			.fill(1)
			.map((_, index) => (
				<td key={id + index} className="text-center">
					{betsMap[index + 1]}
				</td>
			));
	}

	render() {
		const { nextRaceBets, currentUser } = this.props;

		return (
			<Table>
				<thead className="thead-light">
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
							<tr
								key={userInfo.id}
								className={currentUser !== null && currentUser.id === userInfo.id ? "table-info" : ""}
							>
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
