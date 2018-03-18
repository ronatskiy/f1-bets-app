import React from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { withRouter, Redirect } from "react-router-dom";
import { Alert, Button, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";

import { User } from "../../../storage";

@inject(({ rootStore: { sessionStore } }) => ({
	isAuthenticated: sessionStore.isAuthenticated,
	login: ({ login, password }) => sessionStore.login({ login, password }),
	signIn: user => sessionStore.signIn(user),
}))
@withRouter
@observer
class LoginPage extends React.Component {
	static propTypes = {
		login: PropTypes.func.isRequired,
		signIn: PropTypes.func.isRequired,
		isAuthenticated: PropTypes.bool.isRequired,
	};

	state = {
		isRegisterNew: false,
		alertMessage: "",
	};

	constructor(props) {
		super(props);
		this.setNameRef = this.setNameRef.bind(this);
		this.setLoginRef = this.setLoginRef.bind(this);
		this.setPasswordRef = this.setPasswordRef.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	setNameRef = node => {
		this._nameRef = node;
	};
	setLoginRef = node => {
		this._loginRef = node;
	};

	setPasswordRef = node => {
		this._passwordRef = node;
	};

	showAlert(alertMessage) {
		this.setState({
			alertMessage,
		});
	}

	handleSubmit = async () => {
		// TODO: refactor me!!!!
		if (this.state.isRegisterNew) {
			if (!this._nameRef.value || !this._loginRef.value || !this._passwordRef.value) {
				this.showAlert("Не все необходимые данные введены! Попробуйте еще разок.");
				return;
			}
			const user = new User({
				login: this._loginRef.value,
				name: this._nameRef.value,
				password: this._passwordRef.value,
			});
			const result = await this.props.signIn(user);
			if (result !== true) {
				this.showAlert(result);
				return;
			}
		} else {
			if (!this._loginRef.value || !this._passwordRef.value) {
				this.showAlert("Не все необходимые данные введены! Попробуйте еще разок.");
				return;
			}
			const user = new User({
				login: this._loginRef.value,
				password: this._passwordRef.value,
			});

			const result = this.props.login(user);
			if (result !== true) {
				this.showAlert(result);
				return;
			}
		}
		this.props.history.push(this._redirectPath);
	};

	handleRegisterNew = () => {
		this.setState({
			isRegisterNew: true,
		});
	};

	get _redirectPath() {
		const { from } = this.props.location.state || { from: { pathname: "/" } };
		return from;
	}
	render() {
		const { alertMessage, isRegisterNew } = this.state;

		return this.props.isAuthenticated ? (
			<Redirect to={this._redirectPath} />
		) : (
			<Container>
				<Row>
					<Col md={3} />
					<Col md={6}>
						<Form tag="div">
							{isRegisterNew && (
								<FormGroup className="user-view">
									<Label for="name">Ваше имя</Label>
									<Input
										className="login-form__name"
										name="name"
										placeholder="John Doe"
										innerRef={this.setNameRef}
									/>
								</FormGroup>
							)}
							<FormGroup className="user-view">
								<Label for="login">Login</Label>
								<Input
									className="login-form__login"
									name="login"
									placeholder="superman"
									innerRef={this.setLoginRef}
								/>
							</FormGroup>
							<FormGroup className="user-view">
								<Label for="password">Пароль</Label>
								<Input
									className="login-form__password"
									type="password"
									name="password"
									placeholder="Не '12345' :)"
									innerRef={this.setPasswordRef}
								/>
								{isRegisterNew && (
									<FormText color="muted">
										ВАЖНО! Не используйте тут Ваши пароли от банковких и других важных акаунтов.{" "}
										<br />
										Этот пароль не будет как-то особо шифроваться и его могут получить
										злоумышленники.
									</FormText>
								)}
							</FormGroup>
							{alertMessage && (
								<Alert color="danger">
									<span>{alertMessage}</span>
								</Alert>
							)}
							<Button color="primary" type="button" onClick={this.handleSubmit}>
								{!isRegisterNew ? "Вход" : "Зарегистрироваться"}
							</Button>
							{!isRegisterNew && (
								<Button type="button" onClick={this.handleRegisterNew}>
									Зарегистрироваться
								</Button>
							)}
						</Form>
					</Col>
					<Col md={3} />
				</Row>
			</Container>
		);
	}
}

export default LoginPage;
