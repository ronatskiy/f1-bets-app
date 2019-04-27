import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import { USER_LOGIN_RULE, USER_NAME_RULE } from "../../../../constants/validations-rules";
import User from "../../../../../domain/user";

function trimStringValue(value) {
	if (typeof value === "string") {
		return value.trim();
	}

	return value;
}

function trimValues(obj) {
	return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, trimStringValue(v)]));
}

export const UserEditFormFields = {
	LOGIN: "login",
	NAME: "name",
	PASSWORD: "password",
	IS_ADMIN: "isAdmin",
	IS_TESTING: "isTesting",
};

class UserEditFormStore extends MobxReactForm {
	constructor({ user, onUserUpdate, onSuccess, onCancel }) {
		super(
			{
				fields: UserEditFormStore._getFields(user),
			},
			{
				options: {
					showErrorsOnChange: true,
					validateOnChange: true,
				},
				hooks: {
					onSuccess: async form => {
						const newUser = new User({
							...user,
							...trimValues(form.values()),
						});

						await onUserUpdate(newUser);
						form.init(UserEditFormStore._getFields(user));
						onSuccess();
					},
					onError: form => {
						// invalidate the form with a custom error message
						form.invalidate("This is a generic error message!");
					},
				},
			},
		);

		this._onCancel = onCancel;
	}

	plugins() {
		return {
			dvr: dvr(validatorjs),
		};
	}

	static _getFields({ name, login, isAdmin, isTesting }) {
		return [
			{
				name: UserEditFormFields.NAME,
				label: "Имя",
				rules: USER_NAME_RULE,
				value: name,
			},
			{
				name: UserEditFormFields.LOGIN,
				label: "Логин",
				rules: USER_LOGIN_RULE,
				value: login,
			},
			{
				name: UserEditFormFields.IS_ADMIN,
				label: "Admin",
				type: "checkbox",
				value: isAdmin,
			},
			{
				name: UserEditFormFields.IS_TESTING,
				label: "Testing",
				type: "checkbox",
				value: isTesting,
			},
		];
	}

	onCancel = () => {
		this._onCancel();
	};
}

export default UserEditFormStore;
