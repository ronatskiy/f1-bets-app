import React from "react";
import PropTypes from "prop-types";
import Select, { components } from "react-select";

import "./racers-select.css";
import Racer from "../../../domain/racer";

function getLabel({ firstName, lastName }) {
	return `${firstName} ${lastName.toUpperCase()}`;
}

function transformRacers(racerList) {
	return racerList.map(racer => {
		return {
			label: getLabel(racer),
			value: racer,
		};
	});
}

class RacersSelect extends React.Component {
	static propTypes = {
		onSelect: PropTypes.func.isRequired,
		value: PropTypes.instanceOf(Racer),
		racerList: PropTypes.array.isRequired,
		pos: PropTypes.number.isRequired,
		placeholder: PropTypes.string,
	};

	static defaultProps = {
		value: null,
		placeholder: "",
	};

	handleSelect = option => {
		const { pos, onSelect } = this.props;

		onSelect(option ? option.value : null, pos);
	};

	_renderOption = props => {
		const { value: racer } = props;

		return (
			<components.Option {...props} className={"racers-select__option"}>
				{getLabel(racer)}
			</components.Option>
		);
	};

	_renderSingleValue = props => {
		const { data: racer } = props;
		return <components.SingleValue {...props}>{getLabel(racer)}</components.SingleValue>;
	};

	render() {
		const { value, racerList, placeholder } = this.props;
		const options = transformRacers(racerList);

		return (
			<Select
				className="racers-select"
				value={value}
				options={options}
				placeholder={placeholder}
				searchable={false}
				onChange={this.handleSelect}
				components={{
					Option: this._renderOption,
					SingleValue: this._renderSingleValue,
				}}
			/>
		);
	}
}

export default RacersSelect;
