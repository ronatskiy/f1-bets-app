import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react/index";
import { FormGroup, Input, Label } from "../../vendors";

@observer
export class CheckBoxField extends React.Component {
	static propTypes = {
		field: PropTypes.object.isRequired,
		inputClassName: PropTypes.string,
		labelClassName: PropTypes.string,
	};

	render() {
		const { field, inputClassName, labelClassName } = this.props;

		return (
			<FormGroup check>
				<Label className={labelClassName} check>
					<Input {...field.bind()} className={inputClassName} /> {field.label}
				</Label>
			</FormGroup>
		);
	}
}
