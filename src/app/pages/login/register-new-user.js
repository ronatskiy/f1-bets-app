import React from "react";
import { Redirect } from "react-router-dom";
import { Col, Container, Form, FormGroup, Input, Label, Row, FormText } from "reactstrap";

import { User, UserRepository } from "../../../storage";

class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.setNameRef = this.setNameRef.bind(this);
		this.setLoginRef = this.setLoginRef.bind(this);
		this.setPasswordRef = this.setPasswordRef.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	state = {
		redirectToReferrer: false,
	};

	login = user => {
		authService.authenticate(user, async () => {
			await UserRepository.addOrUpdate(user);
			this.setState({
				redirectToReferrer: true,
			});
		});
	};

	setNameRef = node => {
		this._nameRef = node;
	};

	setLoginRef = node => {
		this._loginRef = node;
	};

	setPasswordRef = node => {
		this._passwordRef = node;
	};

	handleSubmit = () => {
		if (!this._nameRef.value || !this._loginRef.value || !this._passwordRef.value) {
			alert("Не все данные введены корректно! Попробуйте еще.");
			return;
		}
		const user = new User({
			login: this._loginRef.value,
			name: this._nameRef.value,
			password: this._passwordRef.value,
		});

		this.login(user);
	};

	render() {
		const { from } = this.props.location.state || { from: { pathname: "/" } };

		return this.state.redirectToReferrer ? (
			<Redirect to={from} />
		) : (
			<Container>
				<Row>
					<Col>
						<Form tag="div">
							<FormGroup className="user-view">
								<Label for="name">Ваше имя</Label>
								<Input
									className="login-form__name"
									name="name"
									placeholder="John Doe"
									innerRef={this.setNameRef}
								/>
							</FormGroup>
							<FormGroup className="user-view">
								<Label for="login">Ваше имя</Label>
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
									placeholder="Какой-то простой пароль"
									innerRef={this.setPasswordRef}
								/>
								<FormText color="muted">
									ВАЖНО! Не используйте тут Ваши пароли от банковких и других важных акаунтов. <br />
									Этот пароль не будет как-то особо шифроваться и его могут получить злоумышленники.
								</FormText>
							</FormGroup>
							<button type="button" className="btn btn-default" onClick={this.handleSubmit}>
								Login
							</button>
						</Form>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default LoginPage;
