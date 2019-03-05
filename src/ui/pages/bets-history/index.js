import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Col, Container, Row, Table } from "../../../vendor";

import { URL_ROUTES } from "../../routes/url-routes";
import "./styles.css";

@inject("userBetsHistoryPageStore")
@observer
class BetsHistory extends React.Component {
	static propTypes = {
		userBetsHistoryPageStore: PropTypes.shape({
			userBets: PropTypes.array.isRequired,
		}).isRequired,
	};

	render() {
		const { userBets } = this.props.userBetsHistoryPageStore;

		return (
			<Container>
				<Row>
					<Col>
						<h1 className="page-title">История Ваших ставок</h1>
					</Col>
				</Row>

				{userBets.length === 0 && (
					<Row>
						<Col>
							<p>
								Похоже Вы еще не делали ставок{" "}
								<Link to={URL_ROUTES.BETS} role="button" className="btn btn-primary">
									Голосование
								</Link>
							</p>
						</Col>
					</Row>
				)}
				{userBets.map(({ raceId, title, bet }) => {
					return (
						<React.Fragment key={raceId}>
							<Row>
								<Col>
									<h2 className="grand-prix-title">{title}</h2>
								</Col>
							</Row>
							<Row>
								<Col>
									<BetsResultsTable bet={bet} raceId={raceId} />
								</Col>
							</Row>
						</React.Fragment>
					);
				})}
			</Container>
		);
	}
}

class BetsResultsTable extends React.Component {
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
		const { bet, raceId } = this.props;

		return (
			<Table size="sm">
				<thead className="thead-light">
					<tr>
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
					<tr key={raceId}>{this.renderBets(bet, raceId)}</tr>
				</tbody>
			</Table>
		);
	}
}

export default BetsHistory;
