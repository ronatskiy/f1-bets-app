import React from "react";
import PropTypes from "prop-types";
import sortBy from "lodash.sortby";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { Collapse, Table } from "../../../../../vendors";

import PseudoLink from "../../../../components/common/pseudo-link";
import "./styles.css";
import ChevronIcon from "../../../../components/common/chevron-icon";

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
			<>
				<h2 className="page-title" onClick={this._toggle}>
					<PseudoLink>
						Сводная таблица результатов голосования
						<ChevronIcon
							className="user-standings-table-header-icon"
							direction={this._isOpen ? "top" : "down"}
						/>
					</PseudoLink>
				</h2>
				<Collapse isOpen={this._isOpen}>
					<Table className="user-standings-table" size="sm" responsive>
						<thead className="thead-light">
							<tr className="text-uppercase">
								<th className="user-standings-table__pos-column">Поз</th>
								<th>Пользователь</th>
								<th className="text-right">очки</th>
							</tr>
						</thead>
						<tbody>
							{sortedVotes.map((vote, index) => (
								<tr key={vote.userId}>
									<td className="user-standings-table__pos-column">{index + 1}</td>
									<td>{vote.userName}</td>
									<td className="text-right">{vote.totalPoints}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Collapse>
			</>
		);
	}
}
