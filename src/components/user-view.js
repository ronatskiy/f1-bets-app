import React from "react";
import PropTypes from "prop-types";
import { Form, FormGroup, Input, Label } from "reactstrap";

import "./user-view.css";
import User from "../domain/user";

class UserView extends React.Component {
	static propTypes = {
		user: PropTypes.instanceOf(User).isRequired,
	};

	handleNameFieldChange = ({ target: { value } }) => {
		this.setState({
			value,
		});
	};

	handleOkClick = () => {
		const { value } = this.state;
		this.setState({
			name: value,
		});

		this.props.onUpdate(value);
	};

	render() {
		return (
			<Form tag="div" inline>
				{!name ? (
					<FormGroup className="user-view">
						<Label for="name" className="user-view__label">
							Имя участника
						</Label>
						<Input
							className="user-view__input"
							type="text"
							name="name"
							id="name"
							placeholder="Введите Ваше имя"
							onChange={this.handleNameFieldChange}
							value={value}
						/>
						<button className="btn btn-default user-view__button" onClick={this.handleOkClick}>
							OK
						</button>
					</FormGroup>
				) : (
					<h2>Приятно Вас видеть, {name}</h2>
				)}
			</Form>
		);
	}
}

export default UserView;
