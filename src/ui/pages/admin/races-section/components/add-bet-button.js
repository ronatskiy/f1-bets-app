import React from "react";
import PropTypes from "prop-types";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";

import Race from "../../../../../domain/race";
import { Button } from "../../../../../vendors";
import BetInfo from "../../../../../domain/bet-info";
import RaceBetDialog from "./race-bet-dialog";

@inject(({ adminPageStore }) => ({
	onBetsSubmit: adminPageStore.racesSectionStore.addNewBet,
}))
@observer
class AddBetButton extends React.Component {
	static propTypes = {
		race: PropTypes.instanceOf(Race),

		onBetsSubmit: PropTypes.func.isRequired,
	};

	@observable _isDialogOpen = false;

	handleSubmit = async (selectedUser, gridInfo) => {
		if (!selectedUser) {
			alert("Выбери Юзера!!!");
			return;
		}

		const betInfo = new BetInfo({
			userInfo: selectedUser.toUserInfo(),
			betsMap: gridInfo,
		});

		await this.props.onBetsSubmit(betInfo, this.props.race);
		this.handleToggleDialog();
	};

	@action
	handleToggleDialog = () => {
		this._isDialogOpen = !this._isDialogOpen;
	};

	@action
	handleUserSelect = user => {
		this._selectedUser = user;
	};

	render() {
		const { race } = this.props;

		return !this._isDialogOpen ? (
			<Button size="sm" color="info" onClick={this.handleToggleDialog}>
				Add bet for user
			</Button>
		) : (
			<RaceBetDialog race={race} onSubmit={this.handleSubmit} onCancel={this.handleToggleDialog} />
		);
	}
}

export default AddBetButton;
