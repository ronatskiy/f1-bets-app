import React from "react";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "../../../../../vendors";
import Select, { components } from "react-select";
import { inject, observer, PropTypes as MobxPropTypes } from "mobx-react";

import GridSelector from "../../../../components/grid-selector/grid-selector";
import Race from "../../../../../domain/race";
import { action, computed, observable } from "mobx";
import Racer from "../../../../../domain/racer";
import User from "../../../../../domain/user";

const getLabel = user => {
	return user.name;
};

const Option = props => {
	const { value: user } = props;

	return (
		<components.Option {...props} className={"users-select__option"}>
			{getLabel(user)}
		</components.Option>
	);
};

const SingleValue = props => {
	const { data: user } = props;
	return <components.SingleValue {...props}>{getLabel(user)}</components.SingleValue>;
};

function UsersSelect({ user, users, onSelect }) {
	const options = users.map(user => ({
		label: getLabel(user),
		value: user,
	}));

	const handleSelect = option => {
		onSelect(option ? option.value : null);
	};

	return (
		<Select
			isClearable
			className={"users-select"}
			value={user}
			options={options}
			searchable={false}
			onChange={handleSelect}
			components={{
				Option,
				SingleValue,
			}}
		/>
	);
}

@inject(({ adminPageStore }) => ({
	racers: adminPageStore.racesSectionStore.racers,
	users: adminPageStore.racesSectionStore.users,
}))
@observer
class RaceBetDialog extends React.Component {
	static propTypes = {
		race: PropTypes.instanceOf(Race).isRequired,
		racers: PropTypes.arrayOf(PropTypes.instanceOf(Racer)).isRequired,
		users: MobxPropTypes.observableArrayOf(PropTypes.instanceOf(User)).isRequired,
		onSubmit: PropTypes.func.isRequired,
		onCancel: PropTypes.func.isRequired,
	};

	@observable
	_selectedUser = null;

	_handleSelectUser = action(user => {
		this._selectedUser = user;
	});

	@computed
	get _canSubmit() {
		return this._selectedUser !== null;
	}

	_handleSubmit = gridInfo => {
		this.props.onSubmit(this._selectedUser, gridInfo);
	};

	render() {
		const { race, users, racers, onCancel } = this.props;

		return (
			<Modal isOpen>
				<ModalHeader>Головование для ({race.prettyTitle})</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label htmlFor="users_select">Выберите пользователя</Label>
							<UsersSelect user={this._selectedUser} users={users} onSelect={this._handleSelectUser} />
						</FormGroup>
						{this._canSubmit && (
							<FormGroup>
								<GridSelector racers={racers} onSave={this._handleSubmit} />
							</FormGroup>
						)}
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="secondary" type="button" onClick={onCancel}>
						Отмена
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

export default RaceBetDialog;
