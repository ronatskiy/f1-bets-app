import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Button, Col, Row, Table } from "reactstrap";

import UserEditForm from "./user-edit-form";

@inject(stores => ({
	usersSectionStore: stores.adminPageStore.usersSectionStore,
}))
@observer
class UsersSection extends Component {
	_toggleForm(visible) {
		this.props.usersSectionStore.toggleUserForm(visible);
	}

	handleInitUsersCollection = async () => {
		// await UserRepository.init();
		this.props.usersSectionStore.fetchUsers();
	};

	handleAddNewUser = () => {
		this._toggleForm(true);
	};

	handleEditUser = id => {
		const { users, setUserForEdit } = this.props.usersSectionStore;
		const user = users.find(user => user.id === id) || null;

		setUserForEdit(user);
	};

	handleUserFormSubmit = async user => {
		return await this.props.usersSectionStore.addOrUpdate(user);
	};

	render() {
		const { isUserFormVisible, storeApiUrl, userForEdit, users, deleteUser } = this.props.usersSectionStore;

		return (
			<section style={{ marginTop: "10px" }}>
				{isUserFormVisible && <UserEditForm onSubmit={this.handleUserFormSubmit} user={userForEdit} />}

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
						<a target="_blank" href={storeApiUrl}>
							{storeApiUrl}
						</a>
					</Col>
				</Row>
			</section>
		);
	}
}

export default UsersSection;
