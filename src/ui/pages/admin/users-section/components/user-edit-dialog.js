import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader } from "../../../../../vendors";
import UserEditFormStore, { UserEditFormFields } from "../stores/user-edit-form-store";
import { TextBoxField } from "../../../../components/text-box-field";
import { CheckBoxField } from "../../../../components/check-box-field";

@observer
class UserEditDialog extends React.Component {
	static propTypes = {
		form: PropTypes.instanceOf(UserEditFormStore).isRequired,
	};

	render() {
		const { form } = this.props;
		const canSubmit = !form.isPristine && (!form.isEmpty || form.isValid);

		return (
			<Modal isOpen>
				<ModalHeader>Пользователь ({form.$(UserEditFormFields.LOGIN).value})</ModalHeader>
				<ModalBody>
					<Form tag="div" className="user-form">
						<TextBoxField field={form.$(UserEditFormFields.NAME)} />
						<CheckBoxField field={form.$(UserEditFormFields.IS_ADMIN)} />
						<CheckBoxField field={form.$(UserEditFormFields.IS_TESTING)} />
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

export default UserEditDialog;
