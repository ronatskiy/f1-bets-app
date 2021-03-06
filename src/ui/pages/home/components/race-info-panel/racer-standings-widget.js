import React from "react";
import PropTypes from "prop-types";

import "./racer-standings-widget.css";
import RacerViewModel from "../../models/racer-view-model";
import RacerView from "./racer-view";

export default class RacerStandingsWidget extends React.Component {
	static propTypes = {
		racers: PropTypes.arrayOf(PropTypes.instanceOf(RacerViewModel)).isRequired,
		rowSize: PropTypes.number,
	};

	static defaultProps = {
		rowSize: 20,
	};

	render() {
		const { racers, rowSize } = this.props;
		const sliceCount = racers.length / rowSize > 1 ? racers.length / rowSize : 1;
		const rows = Array(sliceCount)
			.fill(0)
			.map((_, index) => racers.slice(index * rowSize, index * rowSize + rowSize));

		return rows.map((racers, rowIndex) => (
			<div key={rowIndex} className="racer-standings-widget__row">
				{racers.map((/** @type {RacerViewModel} */ racer, index) => (
					<div className="racer-standings-widget__racer" key={racer.code}>
						<div className="racer-standings-widget__racer-pos-number">
							{index + (rowIndex * rowSize + 1)}
						</div>
						<RacerView className="racer-standings-widget__racer-name" code={racer.code} name={racer.name} />
					</div>
				))}
			</div>
		));
	}
}
