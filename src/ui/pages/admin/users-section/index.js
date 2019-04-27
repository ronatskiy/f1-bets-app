import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Col, Row, Table } from "../../../../vendors";

import UserEditDialog from "./components/user-edit-dialog";
import { UsersCommandButton } from "./components/users-command-button";
import PasswordResetDialog from "./components/password-reset-dialog";

@inject(stores => ({
	usersSectionStore: stores.adminPageStore.usersSectionStore,
}))
@observer
class UsersSection extends Component {
	render() {
		const {
			users,
			userEditForm,
			passwordResetForm,
			editUser,
			resetPassword,
			deleteUser,
			storeApiUrl,
		} = this.props.usersSectionStore;

		return (
			<section>
				<Row>
					<Col>
						<Table bordered size="sm">
							<thead>
								<tr>
									<th>Name</th>
									<th>Login</th>
									<th>isAdmin</th>
									<th>isTesting</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{users.map(({ id, name, login, isAdmin, isTesting }) => (
									<tr key={id}>
										<td title={id}>{name}</td>
										<td>{login}</td>
										<td>
											<input type="checkbox" checked={isAdmin} readOnly />
										</td>
										<td>
											<input type="checkbox" checked={isTesting} readOnly />
										</td>
										<td>
											<UsersCommandButton userId={id} onClick={editUser} size="sm">
												edit
											</UsersCommandButton>{" "}
											<UsersCommandButton userId={id} onClick={resetPassword} size="sm">
												reset password
											</UsersCommandButton>{" "}
											<UsersCommandButton userId={id} onClick={deleteUser} size="sm">
												delete
											</UsersCommandButton>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Col>
				</Row>
				<Row>
					<Col>
						Details:{" "}
						<a target="_blank" rel="noopener noreferrer" href={storeApiUrl}>
							{storeApiUrl}
						</a>
					</Col>
				</Row>
				{userEditForm && <UserEditDialog form={userEditForm} />}
				{passwordResetForm && <PasswordResetDialog form={passwordResetForm} />}
			</section>
		);
	}
}

export default UsersSection;
