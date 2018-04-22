import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { Table } from "reactstrap";

import BetResultCell from "./bet-result-cell";
import UserBetsResult, { OFFICIAL_RESULTS_USER_ID } from "../models/user-bets-result";
import User from "../../../domain/user";

const TableHeader = ({ hasRaceResults }) => (
	<thead className="thead-light">
		<tr className="text-uppercase">
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
);

const TableRow = ({ userBet, isCurrentUserRow = false, hasRaceResults = false, isOfficialResultsRow = false }) => {
	const { betInfo: { userInfo, betsMap }, userScore, userScore: { tooltip, value } } = userBet;
	const classNames = cn({
		"table-info": isCurrentUserRow,
		"table-success": isOfficialResultsRow,
		"font-weight-bold": isOfficialResultsRow,
	});

	return (
		<tr className={classNames}>
			<td>{userInfo.name}</td>
			{Array(10)
				.fill(1)
				.map((_, index) => {
					const cellClassNames =
						hasRaceResults && !isOfficialResultsRow
							? cn({
									"text-success": userScore.getPointsAt(index) >= 10,
									"text-warning": userScore.getPointsAt(index) === 2,
									"text-secondary text--line-through": userScore.getPointsAt(index) === 0,
							  })
							: "";
					return (
						<td key={userInfo.id + index} className="text-center">
							<BetResultCell
								className={cellClassNames}
								points={userScore.getPointsAt(index)}
								text={betsMap[index + 1]}
								isBadgeVisible={hasRaceResults && !isOfficialResultsRow}
							/>
						</td>
					);
				})}
			{hasRaceResults && (
				<td className="text-center">
					<span title={tooltip}>{!isOfficialResultsRow && value}</span>
				</td>
			)}
		</tr>
	);
};

TableRow.propTypes = {
	userBet: PropTypes.instanceOf(UserBetsResult).isRequired,
	isCurrentUserRow: PropTypes.bool,
	hasRaceResults: PropTypes.bool,
	isOfficialResultsRow: PropTypes.bool,
};

class BetsResultsTable extends React.Component {
	static propTypes = {
		raceBetsData: PropTypes.arrayOf(PropTypes.instanceOf(UserBetsResult)).isRequired,
		currentUser: PropTypes.instanceOf(User),
		hasRaceResults: PropTypes.bool,
	};

	static defaultProps = {
		raceBetsData: [],
		currentUser: null,
		hasRaceResults: false,
	};

	render() {
		const { raceBetsData, currentUser, hasRaceResults } = this.props;

		return (
			<Table responsive>
				<TableHeader hasRaceResults={hasRaceResults} />
				<tbody>
					{raceBetsData.map(userBet => {
						const { userInfo } = userBet.betInfo;

						return (
							<TableRow
								userBet={userBet}
								key={userInfo.id}
								isOfficialResultsRow={userInfo.id === OFFICIAL_RESULTS_USER_ID}
								isCurrentUserRow={currentUser && currentUser.id === userInfo.id}
								hasRaceResults={hasRaceResults}
							/>
						);
					})}
				</tbody>
			</Table>
		);
	}
}

export default BetsResultsTable;
