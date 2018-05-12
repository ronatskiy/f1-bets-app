import React from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { withRouter, Redirect } from "react-router-dom";
import { Container, Row, Col, Button } from "../../vendor";

import LoginForm from "./components/login-form";
import RegisterNewAccountForm from "./components/register-new-form";

import "./login.css";

@inject("loginPageStore")
@withRouter
@observer
class LoginPage extends React.Component {
	static propTypes = {
		loginPageStore: PropTypes.shape({
			isRegisterNew: PropTypes.bool.isRequired,
			isUserAuthenticated: PropTypes.bool.isRequired,
			login: PropTypes.func.isRequired,
			signIn: PropTypes.func.isRequired,
		}).isRequired,
	};

	handleRegisterNew = () => {
		this.props.loginPageStore.toggleRegisterNewForm();
	};

	get _redirectPath() {
		const { from } = this.props.location.state || { from: { pathname: "/" /* isRegisterNew: false */ } };
		return from;
	}

	render() {
		const { isRegisterNew, isUserAuthenticated, form } = this.props.loginPageStore;

		return isUserAuthenticated ? (
			<Redirect to={this._redirectPath} />
		) : (
			<Container tag="section" className="section">
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
							<Col>
								{isRegisterNew ? <RegisterNewAccountForm form={form} /> : <LoginForm form={form} />}
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default LoginPage;
