import MobxReactForm from "mobx-react-form";
import validatorjs from "validatorjs";

const defaultErrorHandler = form => {
	// invalidate the form with a custom error message
	form.invalidate("This is a generic error message!");
};

class LoginFormStore extends MobxReactForm {
	constructor(fields, onSuccess, onError = defaultErrorHandler) {
		super(
			{ fields },
			{
				options: {
					showErrorsOnChange: true,
					validateOnChange: true,
				},
				plugins: {
					dvr: validatorjs,
				},
				hooks: {
					onSuccess,
					onError,
				},
			},
		);
	}
}

export default LoginFormStore;
