import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react/index";
import { FormFeedback, FormGroup, Input, Label } from "../../vendors";

@observer
export class TextBoxField extends Component {
	static propTypes = {
		field: PropTypes.object.isRequired,
		inputClassName: PropTypes.string,
		labelClassName: PropTypes.string,
	};

	render() {
		const { field, inputClassName, labelClassName } = this.props;
		const nameError = field.error;
		const nameHasError = Boolean(nameError);

		return (
			<FormGroup>
				<Label className={labelClassName} htmlFor={field.id}>
					{field.label}
				</Label>
				<Input
					{...field.bind()}
					className={inputClassName}
					invalid={nameHasError}
					valid={field.isDirty && !nameHasError}
				/>
				<FormFeedback valid={!nameHasError}>{nameError}</FormFeedback>
			</FormGroup>
		);
	}
}
