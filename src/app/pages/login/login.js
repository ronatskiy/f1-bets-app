import React from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { withRouter, Redirect } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";

import { User } from "../../../storage";

import LoginForm from "./components/login-form";
import RegisterNewAccountForm from "./components/register-new-form";

import "./styles.css";

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
	};

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
		this.setState(state => ({
			isRegisterNew: !state.isRegisterNew,
		}));
	};

	get _redirectPath() {
		const { from } = this.props.location.state || { from: { pathname: "/", isRegisterNew: false } };
		return from;
	}
	render() {
		const { isRegisterNew } = this.state;

		return this.props.isAuthenticated ? (
			<Redirect to={this._redirectPath} />
		) : (
			<Container>
				<Row>
					<Col lg={{ size: 6, offset: 3 }} md={{ size: 8, offset: 2 }}>
						<Row>
							<Col>
								<h1>{!isRegisterNew ? "Вход в F1 Bets App" : "Создать аккаунт"}</h1>
								<div className="text-muted">
									или
									<Button color="link" onClick={this.handleRegisterNew}>
										{isRegisterNew ? " войти в Ваш аккаунт" : " создать аккаунт"}
									</Button>
								</div>
							</Col>
						</Row>
						<Row className="login-form-container">
							<Col>{isRegisterNew ? <RegisterNewAccountForm /> : <LoginForm />}</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default LoginPage;
