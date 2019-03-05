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
		rules: "required|string|alpha_num|between:2,15",
	},
	[LoginFormFields.PASSWORD]: {
		name: LoginFormFields.PASSWORD,
		label: "Пароль",
		placeholder: "Например, ******",
		rules: "required|string|alpha_num|between:5,15",
	},
};

export const registerNewAccountFormSettings = {
	...loginFormSettings,
	[RegisterNewAccountFormFields.NAME]: {
		name: RegisterNewAccountFormFields.NAME,
		label: "Ваше имя",
		placeholder: "Например, John Doe",
		rules: "required|string|between:3,25",
	},
};
