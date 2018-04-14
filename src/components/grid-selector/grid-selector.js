import React from "react";
import PropTypes from "prop-types";
import { observer, PropTypes as MobxPropTypes } from "mobx-react";
import { Form, FormGroup, Table } from "reactstrap";

import RacersSelect from "../racers-select/racers-select";
import Racer from "../../domain/racer";
import GridSelectorStore from "./grid-selector-store";
import PrimaryButton from "../common/primary-button";

@observer
class GridSelector extends React.Component {
	static propTypes = {
		racers: MobxPropTypes.observableArrayOf(PropTypes.instanceOf(Racer)).isRequired,
		onSave: PropTypes.func.isRequired,
		placeholder: PropTypes.string,
		submitButtonText: PropTypes.string,
		gridPositionsCount: PropTypes.number,
		initData: PropTypes.object,
	};

	static defaultProps = {
		placeholder: "",
		submitButtonText: "Сохранить",
		gridPositionsCount: 10,
		initData: {},
	};

	constructor(props) {
		super(props);
		this._grid = new GridSelectorStore(props);
	}

	render() {
		const { placeholder, submitButtonText } = this.props;

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
						{this._grid.tableData.map(({ pos, racer }) => {
							return (
								<tr key={pos}>
									<td className="text-center">{pos}</td>
									<td style={{ width: "85%" }}>
										<RacersSelect
											value={racer}
											racerList={this._grid.availableRacers}
											onSelect={this._grid.handleSelect}
											pos={Number(pos)}
											placeholder={placeholder}
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
				<FormGroup>
					<PrimaryButton onClick={this._grid.handleSubmit}>{submitButtonText}</PrimaryButton>
				</FormGroup>
			</Form>
		);
	}
}

export default GridSelector;
