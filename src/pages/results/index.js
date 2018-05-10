import React from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "reactstrap";
import { inject, observer } from "mobx-react";

import PollingResultsTable from "./components/polling-results-table/index";
import "./styles.css";
import RaceInformation from "./models/race-information";

class ResultsPage extends React.Component {
	static propTypes = {
		raceResultsWithBets: PropTypes.arrayOf(PropTypes.instanceOf(RaceInformation)).isRequired,
	};

	render() {
		const { currentUser, /** @type {RaceInformation[]} */ raceResultsWithBets } = this.props;

		return (
			<Container className="results-page">
				{raceResultsWithBets.map(raceInfo => {
					const { raceId, raceTitle, hasOfficialResults, userBetsResults } = raceInfo;

					if (userBetsResults.length === 0) {
						return null;
					}

					return (
						<Row key={raceId}>
							<Col>
								<h2 className="results-page__race-header">{raceTitle}</h2>

								<PollingResultsTable
									rows={userBetsResults}
									currentUser={currentUser}
									hasRaceResults={hasOfficialResults}
								/>
							</Col>
						</Row>
					);
				})}
			</Container>
		);
	}
}

export default inject(stores => ({
	currentUser: stores.resultsPageStore.authenticatedUser,
	raceResultsWithBets: stores.resultsPageStore.raceResultsWithBets,
}))(observer(ResultsPage));
