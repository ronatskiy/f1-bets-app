import React from "react";
import { observer } from "mobx-react";
import { Form, Label, Input, FormGroup, Button, FormFeedback } from "../../../../vendors";

import { LoginFormFields } from "../../../stores/forms/settings/login-form";

const LoginForm = observer(({ form }) => {
	const loginField = form.$(LoginFormFields.LOGIN);
	const loginError = loginField.error;
	const loginHasError = Boolean(loginError);

	const passwordField = form.$(LoginFormFields.PASSWORD);
	const passwordError = passwordField.error;
	const passwordHasError = Boolean(passwordError);

	return (
		<Form>
			<FormGroup>
				<Label htmlFor={loginField.id}>{loginField.label}</Label>
				<Input {...loginField.bind()} invalid={loginHasError} valid={loginField.isDirty && !loginHasError} />
				<FormFeedback valid={!loginHasError}>{loginField.error}</FormFeedback>
			</FormGroup>

			<FormGroup>
				<Label htmlFor={passwordField.id}>{passwordField.label}</Label>
				<Input
					{...passwordField.bind({ type: "password" })}
					invalid={passwordHasError}
					valid={passwordField.isDirty && !passwordHasError}
				/>
				<FormFeedback valid={!passwordHasError}>{passwordError}</FormFeedback>
			</FormGroup>

			<Button
				color="primary"
				type="submit"
				onClick={form.onSubmit}
				disabled={form.isEmpty || !form.isValid}
				style={{ width: "100%" }}
			>
				Войти в аккаунт
			</Button>
		</Form>
	);
});

export default LoginForm;
