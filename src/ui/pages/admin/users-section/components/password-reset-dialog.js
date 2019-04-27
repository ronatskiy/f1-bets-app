import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader } from "../../../../../vendors";
import { TextBoxField } from "../../../../components/text-box-field";
import PasswordResetFormStore, { PasswordResetFormFields } from "../stores/password-reset-form-store";

@observer
class PasswordResetDialog extends React.Component {
	static propTypes = {
		form: PropTypes.instanceOf(PasswordResetFormStore).isRequired,
	};

	render() {
		const { form } = this.props;
		const canSubmit = !form.isPristine && (!form.isEmpty || form.isValid);

		return (
			<Modal isOpen>
				<ModalHeader>
					Новый пароль для <strong>{form.user.name}</strong>
				</ModalHeader>
				<ModalBody>
					<Form tag="div" className="user-form">
						<TextBoxField field={form.$(PasswordResetFormFields.PASSWORD)} />
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" type="submit" onClick={form.onSubmit} disabled={!canSubmit}>
						Сохранить
					</Button>
					<Button color="secondary" type="button" onClick={form.onCancel}>
						Отмена
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

export default PasswordResetDialog;
