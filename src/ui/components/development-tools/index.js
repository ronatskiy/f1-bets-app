import React, { Component } from "react";
import { action, observable } from "mobx";
import { inject, observer } from "mobx-react";
import MobXDevTools from "mobx-react-devtools";
import { Button, Col, Container, Row } from "../../../vendors";
import DevelopmentModeAlert from "./development-mode-alert";

import "./dev-tools.css";

@observer
class DevelopmentTools extends Component {
	@observable
	isVisible = false;

	toggle = action(() => {
		this.isVisible = !this.isVisible;
	});

	render() {
		return (
			<>
				{this.isVisible ? (
					<div className="dev-tools">
						<div className="dev-tools__tools">
							<DevelopmentModeAlert />
							<Container>
								<Row>
									<Col>
										<UserEditor />
									</Col>
								</Row>
							</Container>
						</div>
						<Button color="danger" size="sm" className="dev-tools__close-button" onClick={this.toggle}>
							x
						</Button>
					</div>
				) : (
					<div title="Open dev tools" className="dev-tools--collapsed-mode" onClick={this.toggle}>
						open
					</div>
				)}
				<MobXDevTools />
			</>
		);
	}
}

@inject("devToolsStore")
@observer
class UserEditor extends Component {
	handleMakeAdmin = () => {
		this.props.devToolsStore.makeUserAdmin();
	};

	render() {
		const { currentUser: user } = this.props.devToolsStore;

		return user ? (
			<div>
				{user.name}: {user.isAdmin ? "Admin" : <button onClick={this.handleMakeAdmin}>Сделать админом</button>}
			</div>
		) : null;
	}
}

export default DevelopmentTools;
