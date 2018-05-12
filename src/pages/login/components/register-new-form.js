import React from "react";
import { observer } from "mobx-react";
import { Form, Label, Input, FormGroup, FormText, FormFeedback } from "../../../vendor";

import { RegisterNewAccountFormFields } from "../../../stores/forms/settings/login-form";
import PrimaryButton from "../../../components/common/primary-button";

const RegisterNewForm = observer(({ form }) => {
	const nameField = form.$(RegisterNewAccountFormFields.NAME);
	const nameError = nameField.error;
	const nameHasError = Boolean(nameError);

	const loginField = form.$(RegisterNewAccountFormFields.LOGIN);
	const loginError = loginField.error;
	const loginHasError = Boolean(loginError);

	const passwordField = form.$(RegisterNewAccountFormFields.PASSWORD);
	const passwordError = passwordField.error;
	const passwordHasError = Boolean(passwordError);

	return (
		<Form>
			<FormGroup>
				<Label htmlFor={nameField.id}>{nameField.label}</Label>
				<Input {...nameField.bind()} invalid={nameHasError} valid={nameField.isDirty && !nameHasError} />
				<FormFeedback valid={!nameHasError}>{nameError}</FormFeedback>
			</FormGroup>

			<FormGroup>
				<Label htmlFor={loginField.id}>{loginField.label}</Label>
				<Input {...loginField.bind()} invalid={loginHasError} valid={loginField.isDirty && !loginHasError} />
				<FormFeedback valid={!loginHasError}>{loginError}</FormFeedback>
			</FormGroup>

			<FormGroup>
				<Label htmlFor={passwordField.id}>{passwordField.label}</Label>
				<Input
					{...passwordField.bind({ type: "password" })}
					invalid={passwordHasError}
					valid={passwordField.isDirty && !passwordHasError}
				/>
				<FormFeedback valid={!passwordHasError}>{passwordError}</FormFeedback>
				<FormText color="muted">
					ВАЖНО! Не используйте здесь Ваши пароли от банковких и других важных акаунтов. <br />
					Этот пароль не будет как-то особо шифроваться и его могут получить злоумышленники. <br />
					Ну, я предупредил если что :)
				</FormText>
			</FormGroup>
			<PrimaryButton
				type="submit"
				disabled={form.isEmpty || !form.isValid}
				onClick={form.onSubmit}
				style={{ width: "100%" }}
			>
				Создать новый аккаунт
			</PrimaryButton>
		</Form>
	);
});

export default RegisterNewForm;
