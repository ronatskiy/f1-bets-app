import React from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "reactstrap";
import { inject, observer } from "mobx-react";

import BetsResultsTable from "./components/bets-results-table";
import "./styles.css";
import RaceInformation from "./models/race-information";

const ResultsPage = props => {
	const { currentUser, raceResultsWithBets } = props;

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

							<BetsResultsTable
								raceBetsData={userBetsResults}
								currentUser={currentUser}
								hasRaceResults={hasOfficialResults}
							/>
						</Col>
					</Row>
				);
			})}
		</Container>
	);
};

ResultsPage.propTypes = {
	raceResultsWithBets: PropTypes.arrayOf(PropTypes.instanceOf(RaceInformation)).isRequired,
};

export default inject(stores => ({
	currentUser: stores.resultsPageStore.currentUser,
	raceResultsWithBets: stores.resultsPageStore.raceResultsWithBets,
}))(observer(ResultsPage));
