import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, PropTypes as MobxPropTypes } from "mobx-react";
import { observable, computed } from "mobx";
import { Form, FormGroup, Button, Table } from "reactstrap";

import RacersSelect from "./racers-select/racers-select";
import Racer from "../domain/racer";

class Grid {
	@observable racers = [];

	@observable
	map = new Map([
		[1, null],
		[2, null],
		[3, null],
		[4, null],
		[5, null],
		[6, null],
		[7, null],
		[8, null],
		[9, null],
		[10, null],
	]);

	getGridMapAsJS = () => {
		const js = {};
		for (let [pos, racer] of this.map) {
			if (racer) {
				js[pos] = racer.abbreviation;
			}
		}
		return js;
	};

	@computed
	get tableData() {
		const tableData = [];

		for (let [pos, racer] of this.map) {
			tableData.push({ pos, racer });
		}

		return tableData;
	}

	@computed
	get availableRacers() {
		return this.racers.filter(({ name }) => {
			return !this.tableData.filter(({ racer }) => Boolean(racer)).some(({ racer }) => racer.name === name);
		});
	}
}

@observer
class GridSelector extends Component {
	static propTypes = {
		racers: MobxPropTypes.observableArrayOf(PropTypes.instanceOf(Racer)).isRequired,
		onSave: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this._grid = new Grid();
		this._grid.racers = props.racers;
	}

	handleSubmit = async () => {
		this.props.onSave(this._grid.getGridMapAsJS());
	};

	handleSelect = (racer, pos) => {
		this._grid.map.set(pos, racer);
	};

	render() {
		const { availableRacers, tableData } = this._grid;

		return (
			<Form tag="div">
				<Table striped>
					<thead>
						<tr>
							<th className="text-center">Позиция</th>
							<th>Пилот</th>
						</tr>
					</thead>
					<tbody>
						{tableData.map(({ pos, racer }) => {
							return (
								<tr key={pos}>
									<td className="text-center">{pos}</td>
									<td style={{ width: "85%" }}>
										<RacersSelect
											value={racer}
											racerList={availableRacers}
											onSelect={this.handleSelect}
											pos={Number(pos)}
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
				<FormGroup>
					<Button onClick={this.handleSubmit} color="primary">
						Сохранить
					</Button>
				</FormGroup>
			</Form>
		);
	}
}

export default GridSelector;
