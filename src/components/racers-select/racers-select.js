import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

import "./racers-select.css";
import Racer from "../../domain/racer";

function racerListTransformer(racerList) {
	return racerList.map(racer => {
		return {
			label: valueRenderer(racer),
			value: racer,
		};
	});
}

function valueRenderer({ firstName, lastName }) {
	return `${firstName} ${lastName.toUpperCase()}`;
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

	render() {
		const { value, racerList, placeholder } = this.props;
		const options = racerListTransformer(racerList);

		return (
			<Select
				className="racers-select"
				value={value}
				options={options}
				placeholder={placeholder}
				searchable={false}
				valueRenderer={valueRenderer}
				optionClassName="racers-select__option"
				onChange={this.handleSelect}
			/>
		);
	}
}

export default RacersSelect;
