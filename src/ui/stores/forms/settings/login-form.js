import { USER_LOGIN_RULE, USER_NAME_RULE, USER_PASSWORD_RULE } from "../../../constants/validations-rules";

export const LoginFormFields = {
	LOGIN: "login",
	PASSWORD: "password",
};

export const RegisterNewAccountFormFields = {
	...LoginFormFields,
	NAME: "name",
};

export const loginFormSettings = {
	[LoginFormFields.LOGIN]: {
		name: LoginFormFields.LOGIN,
		label: "Логин",
		placeholder: "Например, superman",
		rules: USER_LOGIN_RULE,
	},
	[LoginFormFields.PASSWORD]: {
		name: LoginFormFields.PASSWORD,
		label: "Пароль",
		placeholder: "Например, ******",
		type: "password",
		rules: USER_PASSWORD_RULE,
	},
};

export const registerNewAccountFormSettings = {
	...loginFormSettings,
	[RegisterNewAccountFormFields.NAME]: {
		name: RegisterNewAccountFormFields.NAME,
		label: "Ваше имя",
		placeholder: "Например, John Doe",
		rules: USER_NAME_RULE,
	},
};
