import React from "react";
import PropTypes from "prop-types";
import { Col, Container, Row, Table } from "reactstrap";
import { inject, observer } from "mobx-react";
import cn from "classnames";

import { User } from "../../../storage";
import "./styles.css";

@inject(stores => ({
	currentUser: stores.rootStore.resultsPageSrore.currentUser,
	allBetsData: stores.rootStore.resultsPageSrore.allBetsData,
}))
@observer
class ResultsPage extends React.Component {
	render() {
		const { currentUser, allBetsData } = this.props;

		return (
			<Container className="results-page">
				{allBetsData.map(raceInfo => {
					const { raceTitle, usersBets, raceId, hasRaceResults } = raceInfo;

					if (usersBets.length === 0) {
						return null;
					}

					return (
						<Row key={raceId}>
							<Col>
								<h2 className="results-page__race-header">{raceTitle}</h2>
								<BetsResultsTable
									nextRaceBets={usersBets}
									currentUser={currentUser}
									hasRaceResults={hasRaceResults}
								/>
							</Col>
						</Row>
					);
				})}
			</Container>
		);
	}
}

class BetsResultsTable extends React.Component {
	static propTypes = {
		nextRaceBets: PropTypes.array,
		currentUser: PropTypes.instanceOf(User),
		hasRaceResults: PropTypes.bool,
	};

	static defaultProps = {
		nextRaceBets: [],
		currentUser: null,
		hasRaceResults: false,
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
		const { nextRaceBets, currentUser, hasRaceResults } = this.props;

		return (
			<Table responsive>
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
						{hasRaceResults && <th className="text-center">PTS</th>}
					</tr>
				</thead>
				<tbody>
					{nextRaceBets.map(({ betInfo, score }) => {
						const { userInfo, betsMap } = betInfo;
						const isOfficialResultsRow = userInfo.id === "official-results";
						const classNames = cn({
							"table-info": currentUser !== null && currentUser.id === userInfo.id,
							"table-success": userInfo.id === "official-results",
							"font-weight-bold": isOfficialResultsRow,
						});

						return (
							<tr key={userInfo.id} className={classNames}>
								<td>{userInfo.name}</td>
								{this.renderBets(betsMap, userInfo.id)}
								{hasRaceResults && (
									<td>
										<span title={score.tooltip}>{isOfficialResultsRow ? "" : score.value}</span>
									</td>
								)}
							</tr>
						);
					})}
				</tbody>
			</Table>
		);
	}
}

export default ResultsPage;
