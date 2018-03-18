import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Col, Form, FormGroup, Input, Label, Row, Table } from "reactstrap";

import { UserRepository, User } from "../../../../storage";
import { inject, observer } from "mobx-react";

@inject(({ rootStore: { userStore } }) => ({ users: userStore.users, fetchUsers: () => userStore.fetchUsers() }))
@observer
class UsersSection extends Component {
	state = {
		isUserFormVisible: false,
	};

	_toggleForm(visible) {
		this.setState({
			isUserFormVisible: visible,
		});
	}

	handleInitUsersCollection = async () => {
		await UserRepository.init();
		this.props.fetchUsers();
	};

	handleAddNewRace = () => {};

	handleUserFormSubmit = async user => {
		await UserRepository.addOrUpdate(user);
		this._toggleForm(false);
		this.props.fetchUsers();
	};

	render() {
		const { isUserFormVisible } = this.state;
		const { users } = this.props;
		return (
			<section style={{ marginTop: "10px" }}>
				{isUserFormVisible && <UserForm onSubmit={this.handleUserFormSubmit} />}

				<Row>
					<Col className="command-buttons-container">
						<Button
							size="sm"
							color="info"
							className="command-button"
							onClick={this.handleInitUsersCollection}
						>
							Init User's Col
						</Button>
						<Button size="sm" color="info" className="command-button" onClick={this.handleAddNewRace}>
							Add New User
						</Button>
					</Col>
				</Row>

				<Row>
					<Col>
						<Table bordered size="sm">
							<thead>
								<tr>
									<th>User Name</th>
									<th>Login</th>
									<th>Password</th>
								</tr>
							</thead>
							<tbody>
								{users.map(user => {
									const { id, name, password, login } = user;

									return (
										<tr key={id}>
											<td title={id}>{name}</td>
											<td>{login}</td>
											<td>{password}</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</Col>
				</Row>
				<Row>
					<Col>
						Details:{" "}
						<a target="_blank" href={UserRepository.DATA_STORE_URL}>
							{UserRepository.DATA_STORE_URL}
						</a>
					</Col>
				</Row>
			</section>
		);
	}
}

class UserForm extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
	};

	handleOkClick = () => {
		const user = new User({
			login: this._userLoginInput.value,
			name: this._userNameInput.value,
			password: this._userPasswordInput.value,
			isAdmin: this._userIsAdminInput.checked,
		});

		this.props.onSubmit(user);
	};

	render() {
		return (
			<Row>
				<Col>
					<Form tag="div" className="user-form">
						<FormGroup>
							<Label for="name" className="user-form__label">
								Login
							</Label>
							<Input
								className="user-form__input"
								type="text"
								name="login"
								id="login"
								placeholder="Login"
								innerRef={node => {
									this._userLoginInput = node;
								}}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="name" className="user-form__label">
								Имя участника
							</Label>
							<Input
								className="user-form__input"
								type="text"
								name="name"
								id="name"
								placeholder="Введите Ваше имя"
								innerRef={node => {
									this._userNameInput = node;
								}}
							/>
						</FormGroup>
						<FormGroup className="user-form">
							<Label for="password" className="user-form__label">
								Пароль
							</Label>
							<Input
								className="user-form__input user-form__input--password"
								type="password"
								name="password"
								id="password"
								placeholder="Введите пароль"
								innerRef={node => {
									this._userPasswordInput = node;
								}}
							/>
						</FormGroup>
						<FormGroup check>
							<Label check>
								<Input
									type="checkbox"
									innerRef={node => {
										this._userIsAdminInput = node;
									}}
								/>{" "}
								Check me out
							</Label>
						</FormGroup>
						<FormGroup>
							<button className="btn btn-default user-form__button" onClick={this.handleOkClick}>
								OK
							</button>
						</FormGroup>
					</Form>
				</Col>
			</Row>
		);
	}
}

export default UsersSection;
