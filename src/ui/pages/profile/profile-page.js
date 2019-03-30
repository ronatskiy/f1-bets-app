import React from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { Col, Container, Row } from "../../../vendors";
import ProfileEditorForm from "./profile-editor-form";
import ProfileEditFormStore from "./stores/profile-edit-form-store";

@inject(({ profilePageStore }) => ({
	profileEditForm: profilePageStore.profileEditForm,
	initForm: profilePageStore.initForm,
}))
class ProfilePage extends React.Component {
	static propTypes = {
		profileEditForm: PropTypes.instanceOf(ProfileEditFormStore),
		initForm: PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.props.initForm();
	}

	render() {
		const { profileEditForm } = this.props;

		return (
			<Container tag="section" className="section">
				<Row>
					<Col>
						<h1 className="page-title">Редактор профиля пользователя</h1>
					</Col>
				</Row>

				{profileEditForm && (
					<Row>
						<Col>
							<ProfileEditorForm form={profileEditForm} />
						</Col>
					</Row>
				)}
			</Container>
		);
	}
}

export default ProfilePage;
