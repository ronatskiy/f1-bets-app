import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

export const ProfileEditFormFields = {
	LOGIN: "login",
	NAME: "name",
};

class ProfileEditFormStore extends MobxReactForm {
	constructor({ user, onUserUpdate }) {
		super(
			{
				fields: ProfileEditFormStore._getFields(user),
			},
			{
				options: {
					showErrorsOnChange: true,
					validateOnChange: true,
				},
				hooks: {
					onSuccess: async form => {
						const user = form.values();
						await onUserUpdate(user);
						form.init(ProfileEditFormStore._getFields(user));
					},
					onError: form => {
						// invalidate the form with a custom error message
						form.invalidate("This is a generic error message!");
					},
				},
			},
		);
	}

	plugins() {
		return {
			dvr: dvr(validatorjs),
		};
	}

	static _getFields({ name, login }) {
		return [
			{
				name: ProfileEditFormFields.NAME,
				label: "Имя",
				placeholder: "Например, John Doe",
				rules: "required|string|between:3,25",
				value: name,
			},
			{
				name: ProfileEditFormFields.LOGIN,
				label: "Логин",
				placeholder: "Например, superman",
				rules: "required|string|alpha_num|between:2,15",
				value: login,
			},
		];
	}
}

export default ProfileEditFormStore;
