import React from "react";
import PropTypes from "prop-types";
import { Table } from "../../../../../vendors";

import UserBetsResult, { OFFICIAL_RESULTS_USER_ID } from "../../models/user-bets-result";
import User from "../../../../../domain/user";
import TableHeader from "./header";
import TableRow from "./row";

class PollingResultsTable extends React.Component {
	static propTypes = {
		rows: PropTypes.arrayOf(PropTypes.instanceOf(UserBetsResult)).isRequired,
		currentUser: PropTypes.instanceOf(User),
		hasRaceResults: PropTypes.bool,
	};

	static defaultProps = {
		rows: [],
		currentUser: null,
		hasRaceResults: false,
	};

	render() {
		const { /** @type {UserBetsResult[]} */ rows, currentUser, hasRaceResults } = this.props;

		return (
			<Table size="sm" responsive>
				<TableHeader hasRaceResults={hasRaceResults} />
				<tbody>
					{rows.map(userBetsResult => {
						return (
							<TableRow
								userPollData={userBetsResult}
								key={userBetsResult.id}
								isOfficialResultsRow={userBetsResult.id === OFFICIAL_RESULTS_USER_ID}
								isCurrentUserRow={currentUser && currentUser.id === userBetsResult.id}
								hasRaceResults={hasRaceResults}
							/>
						);
					})}
				</tbody>
			</Table>
		);
	}
}

export default PollingResultsTable;
