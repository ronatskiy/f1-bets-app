import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";

import Race from "../../../../domain/race";

class RaceSelect extends React.Component {
	static propTypes = {
		value: PropTypes.instanceOf(Race),
		onSelect: PropTypes.func.isRequired,
		raceList: PropTypes.array.isRequired,
	};

	static defaultProps = {
		value: null,
	};

	handleSelect = race => {
		this.props.onSelect(race);
	};

	render() {
		const { value, raceList } = this.props;

		return (
			<Select value={value} labelKey="title" options={raceList} searchable={false} onChange={this.handleSelect} />
		);
	}
}

export default RaceSelect;
