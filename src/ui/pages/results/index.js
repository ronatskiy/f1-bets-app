import React from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { Col, Container, Row } from "../../../vendors";

import PollingResultsTable from "./components/polling-results-table";
import RaceInformation from "./models/race-information";
import UserStandingsTable from "./components/user-standings-table";
import UserStanding from "./models/user-standing";
import User from "../../../domain/user";

import "./styles.css";

@inject(({ resultsPageStore }) => ({
	currentUser: resultsPageStore.authenticatedUser,
	raceResultsWithBets: resultsPageStore.raceResultsWithBets,
	userStandings: resultsPageStore.userStandings,
}))
class ResultsPage extends React.Component {
	static propTypes = {
		currentUser: PropTypes.instanceOf(User),
		raceResultsWithBets: PropTypes.arrayOf(PropTypes.instanceOf(RaceInformation)).isRequired,
		userStandings: PropTypes.arrayOf(PropTypes.instanceOf(UserStanding)).isRequired,
	};

	render() {
		const { currentUser, /** @type {RaceInformation[]} */ raceResultsWithBets, userStandings } = this.props;

		return (
			<Container tag="section" className="page">
				{userStandings.length > 0 && (
					<Row>
						<Col>
							<UserStandingsTable usersVotes={userStandings} />
						</Col>
					</Row>
				)}
				{raceResultsWithBets.reverse().map(raceInfo => {
					const { raceId, raceTitle, hasOfficialResults, userBetsResults } = raceInfo;

					if (userBetsResults.length === 0) {
						return null;
					}

					return (
						<Row key={raceId}>
							<Col>
								<h2 className="page-title">{raceTitle}</h2>

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

export default ResultsPage;
