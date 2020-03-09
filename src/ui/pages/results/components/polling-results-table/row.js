import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import BetResultCell from "./cell";
import UserBetsResult from "../../models/user-bets-result";

class TableRow extends React.Component {
	static propTypes = {
		userPollData: PropTypes.instanceOf(UserBetsResult).isRequired,
		isCurrentUserRow: PropTypes.bool,
		hasRaceResults: PropTypes.bool,
		isOfficialResultsRow: PropTypes.bool,
	};

	render() {
		const {
			/** @type {UserBetsResult} */ userPollData,
			isCurrentUserRow = false,
			hasRaceResults = false,
			isOfficialResultsRow = false,
		} = this.props;
		const { id, name, userPoll, userScore } = userPollData;
		const classNames = cn({
			"table-info": isCurrentUserRow,
			"table-success": isOfficialResultsRow,
		});

		return (
			<tr className={classNames}>
				<td>{name}</td>
				{Array(10)
					.fill(1)
					.map((_, index) => {
						return (
							<td key={id + index} className="text-center">
								<BetResultCell
									points={userScore.getPointsAt(index)}
									text={userPoll[index + 1]}
									isBadgeVisible={hasRaceResults && !isOfficialResultsRow}
								/>
							</td>
						);
					})}
				{hasRaceResults && (
					<td className="text-center">
						<span title={userScore.tooltip}>{!isOfficialResultsRow && userScore.value}</span>
					</td>
				)}
			</tr>
		);
	}
}

export default TableRow;
