import React from "react";
import { observer } from "mobx-react";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "../../../vendors";
import { ProfileEditFormFields } from "./stores/profile-edit-form-store";
import { RegisterNewAccountFormFields } from "../../stores/forms/settings/login-form";

function ProfileEditorForm({ form }) {
	const nameField = form.$(RegisterNewAccountFormFields.NAME);
	const nameError = nameField.error;
	const nameHasError = Boolean(nameError);

	const loginField = form.$(ProfileEditFormFields.LOGIN);
	const loginError = loginField.error;
	const loginHasError = Boolean(loginError);
	const canSubmit = !form.isPristine && (!form.isEmpty || form.isValid);

	return (
		<Form>
			<FormGroup>
				<Label htmlFor={nameField.id}>{nameField.label}</Label>
				<Input
					{...nameField.bind()}
					autocomplete={"off"}
					invalid={nameHasError}
					valid={nameField.isDirty && !nameHasError}
				/>
				<FormFeedback valid={!nameHasError}>{nameError}</FormFeedback>
			</FormGroup>

			<FormGroup>
				<Label htmlFor={loginField.id}>{loginField.label}</Label>
				<Input
					{...loginField.bind()}
					autocomplete={"off"}
					invalid={loginHasError}
					valid={loginField.isDirty && !loginHasError}
				/>
				<FormFeedback valid={!loginHasError}>{loginError}</FormFeedback>
			</FormGroup>
			<Button color="primary" type="submit" onClick={form.onSubmit} disabled={!canSubmit}>
				Обновить профиль
			</Button>
		</Form>
	);
}

export default observer(ProfileEditorForm);
