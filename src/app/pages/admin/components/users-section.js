import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Col, Form, FormGroup, Input, Label, Row, Table } from "reactstrap";

import { UserRepository, User } from "../../../../storage";
import { inject, observer } from "mobx-react";

@inject(stores => {
	return {
		users: stores.rootStore.userStore.users,
		fetchUsers: () => stores.rootStore.userStore.fetchUsers(),
		deleteUser: id => stores.rootStore.adminPageStore.deleteUser(id),
	};
})
@observer
class UsersSection extends Component {
	state = {
		isUserFormVisible: false,
		userForEdit: null,
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

	handleAddNewUser = () => {
		this._toggleForm(true);
	};

	handleEditUser = id => {
		const user = this.props.users.find(user => user.id === id) || null;
		this.setState({
			userForEdit: user,
		});
		this._toggleForm(true);
	};

	handleUserFormSubmit = async user => {
		await UserRepository.addOrUpdate(user);
		this._toggleForm(false);
		this.props.fetchUsers();
	};

	render() {
		const { isUserFormVisible } = this.state;
		const { users, deleteUser } = this.props;
		return (
			<section style={{ marginTop: "10px" }}>
				{isUserFormVisible && <UserForm onSubmit={this.handleUserFormSubmit} user={this.state.userForEdit} />}

				<Row>
					<Col className="command-buttons-container">
						<Button
							size="sm"
							color="info"
							className="command-button"
							disabled
							onClick={this.handleInitUsersCollection}
						>
							Init User's Col
						</Button>
						<Button size="sm" color="info" className="command-button" onClick={this.handleAddNewUser}>
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
									<th>isAdmin</th>
									<th>isTesting</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{users.map(user => {
									const { id, name, login, isAdmin, isTesting } = user;

									return (
										<tr key={id}>
											<td title={id}>{name}</td>
											<td>{login}</td>
											<td>
												<div>
													<input type="checkbox" checked={isAdmin} readOnly />
												</div>
											</td>
											<td>
												<input type="checkbox" checked={isTesting} readOnly />
											</td>
											<td>
												<Button onClick={() => this.handleEditUser(id)}>edit</Button>
												<Button
													onClick={() => {
														deleteUser(id);
													}}
												>
													delete
												</Button>
											</td>
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
		user: PropTypes.instanceOf(User),
	};

	handleOkClick = () => {
		const { user } = this.props;

		const newUser = new User({
			id: (user && user.id) || undefined,
			login: this._userLoginInput.value,
			name: this._userNameInput.value,
			password: this._userPasswordInput.value,
			isAdmin: this._userIsAdminInput.checked,
		});

		this.props.onSubmit(newUser);
	};

	componentWillReceiveProps({ user }) {
		if (user) {
			const { login, name, password, isAdmin } = user;
			this._userLoginInput.value = login;
			this._userNameInput.value = name;
			this._userPasswordInput.value = password;
			this._userIsAdminInput.checked = isAdmin;
		}
	}

	render() {
		return (
			<Row>
				<Col>
					<Form tag="div" className="user-form">
						<FormGroup>
							<Label for="login" className="user-form__label">
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
