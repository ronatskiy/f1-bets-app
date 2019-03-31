import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import { USER_PASSWORD_RULE } from "../../../../constants/validations-rules";

export const PasswordResetFormFields = {
	PASSWORD: "password",
};

class PasswordResetFormStore extends MobxReactForm {
	constructor({ user, onSuccess, onCancel }) {
		super(
			{
				fields: PasswordResetFormStore._getFields(),
			},
			{
				options: {
					showErrorsOnChange: true,
					validateOnChange: true,
				},
				hooks: {
					onSuccess: form => {
						const password = form.values()[PasswordResetFormFields.PASSWORD].trim();
						form.init(PasswordResetFormStore._getFields(password));

						onSuccess(password);
					},
					onError: form => {
						// invalidate the form with a custom error message
						form.invalidate("This is a generic error message!");
					},
				},
			},
		);

		this._onCancel = onCancel;
		this.user = user;
	}

	plugins() {
		return {
			dvr: dvr(validatorjs),
		};
	}

	static _getFields(password = "") {
		return [
			{
				name: PasswordResetFormFields.PASSWORD,
				label: "Пароль",
				rules: USER_PASSWORD_RULE,
				value: password,
			},
		];
	}

	onCancel = () => {
		this._onCancel();
	};
}

export default PasswordResetFormStore;
