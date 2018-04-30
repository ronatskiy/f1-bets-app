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
		const rows = Array(racers.length / rowSize)
			.fill(0)
			.map((_, index) => {
				return racers.slice(index * rowSize, index * rowSize + rowSize); // , [...racers.slice(rowSize, 21)])
			});

		return rows.map((racers, rowIndex) => (
			<div key={rowIndex} className="racer-standings-widget__row">
				{racers.map((/** @type {RacerViewModel} */ racer, index) => (
					<div className="racer-standings-widget__racer" key={racer.abbreviation}>
						<div className="racer-standings-widget__racer-pos-number">
							{index + (rowIndex * rowSize + 1)}
						</div>
						<RacerView
							className="racer-standings-widget__racer-name"
							code={racer.abbreviation}
							name={racer.name}
						/>
					</div>
				))}
			</div>
		));
	}
}
