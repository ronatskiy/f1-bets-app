import React from "react";
import PropTypes from "prop-types";
import { Collapse, Table } from "reactstrap";
import sortBy from "lodash.sortby";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/fontawesome-free-solid";

import PseudoLink from "../../../../components/common/pseudo-link";

@observer
export default class UserStandingsTable extends React.Component {
	static propTypes = {
		usersVotes: PropTypes.arrayOf(
			PropTypes.shape({
				userId: PropTypes.string,
				userName: PropTypes.string,
				totalPoints: PropTypes.number,
			}),
		).isRequired,
	};

	@observable _isOpen = false;

	@action
	_toggle = () => {
		this._isOpen = !this._isOpen;
	};

	render() {
		const { usersVotes = [] } = this.props;
		const sortedVotes = sortBy(usersVotes, uv => -uv.totalPoints);

		return (
			<React.Fragment>
				<h2 className="results-page__race-header" onClick={this._toggle}>
					<PseudoLink>
						Сводная таблица результатов голосования <FontAwesomeIcon icon={faAngleDown} />
					</PseudoLink>
				</h2>
				<Collapse isOpen={this._isOpen}>
					<Table size="sm" responsive>
						<thead className="thead-light">
							<tr className="text-uppercase">
								<th>Пользователь</th>
								<th className="text-right">очки</th>
							</tr>
						</thead>
						<tbody>
							{sortedVotes.map(vote => (
								<tr key={vote.userId}>
									<td>{vote.userName}</td>
									<td className="text-right">{vote.totalPoints}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Collapse>
			</React.Fragment>
		);
	}
}
