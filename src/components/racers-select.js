import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import "react-select/dist/react-select.css";

import Racer from "../domain/racer";

class RacersSelect extends React.Component {
	static propTypes = {
		onSelect: PropTypes.func.isRequired,
		value: PropTypes.instanceOf(Racer),
		racerList: PropTypes.array.isRequired,
		pos: PropTypes.number.isRequired,
	};

	static defaultProps = {
		value: null,
	};

	handleSelect = racer => {
		const { pos, onSelect } = this.props;

		onSelect(racer, pos);
	};

	render() {
		const { value, racerList } = this.props;

		return (
			<Select
				value={value}
				labelKey="name"
				options={racerList}
				placeholder="Укажите Ваш прогноз"
				searchable={false}
				onChange={this.handleSelect}
			/>
		);
	}
}

export default RacersSelect;
