import React from "react";
import PropTypes from "prop-types";
import { Col, FormGroup, Input, Label, Row, Form } from "reactstrap";

import User from "../../../../domain/user";

export default class UserEditForm extends React.Component {
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
