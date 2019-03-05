import React from "react";
import PropTypes from "prop-types";
import { observable, action } from "mobx";
import { observer, inject, PropTypes as MobxPropTypes } from "mobx-react";
import Select from "react-select";
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label } from "../../../../../vendor";

import Race from "../../../../../domain/race";
import PrimaryButton from "../../../../components/common/primary-button";
import GridSelector from "../../../../components/grid-selector/grid-selector";
import Racer from "../../../../../domain/racer";
import User from "../../../../../domain/user";
import BetInfo from "../../../../../domain/bet-info";

@inject(stores => ({
	onBetsSubmit: stores.adminPageStore.racesSectionStore.addNewBet,
	racers: stores.adminPageStore.racesSectionStore.racers,
	users: stores.adminPageStore.racesSectionStore.users,
}))
@observer
class AddBetButton extends React.Component {
	static propTypes = {
		race: PropTypes.instanceOf(Race),
		racers: MobxPropTypes.observableArrayOf(PropTypes.instanceOf(Racer)).isRequired,
		users: MobxPropTypes.observableArrayOf(PropTypes.instanceOf(User)).isRequired,
		onBetsSubmit: PropTypes.func,
	};

	@observable _isDialogOpen = false;
	@observable _selectedUser = null;

	@action
	handleSubmit = async gridInfo => {
		if (!this._selectedUser) {
			alert("Выбери Юзера!!!");
			return;
		}

		const betInfo = new BetInfo({
			userInfo: this._selectedUser.toUserInfo(),
			betsMap: gridInfo,
		});

		await this.props.onBetsSubmit(betInfo);
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
		const { race, users, racers } = this.props;

		return (
			<React.Fragment>
				<PrimaryButton onClick={this.handleToggleDialog}>Add bet</PrimaryButton>
				{this._isDialogOpen && (
					<Modal isOpen={true}>
						<ModalHeader>Головование для ({race.title})</ModalHeader>
						<ModalBody>
							<Form>
								<FormGroup>
									<Label htmlFor="users_select">Выберите пользователя</Label>
									<Select
										name="users_select"
										value={this._selectedUser}
										labelKey="name"
										options={users.slice()}
										searchable={false}
										onChange={this.handleUserSelect}
									/>
								</FormGroup>
								<FormGroup>
									<GridSelector racers={racers} onSave={this.handleSubmit} />
								</FormGroup>
							</Form>
						</ModalBody>
					</Modal>
				)}
			</React.Fragment>
		);
	}
}

export default AddBetButton;
