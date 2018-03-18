import React, { Component } from "react";
import PropTypes from "prop-types";
import { Racer, User } from "../../../../storage/index";
import { Form, FormGroup, Button, Table } from "reactstrap";
import { PropTypes as MobxPropTypes } from "mobx-react";

import RacersSelect from "./racers-select";
import { BetInfo } from "../../../../storage";
import { pathNames } from "../../../routes/routes";
import { withRouter } from "react-router-dom";

class BetsForm extends Component {
	static propTypes = {
		racers: MobxPropTypes.observableArrayOf(PropTypes.instanceOf(Racer)).isRequired,
		user: PropTypes.instanceOf(User),
		onBetsSubmit: PropTypes.func.isRequired,
	};

	state = {
		bets: new Map([
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
		]),
	};

	getBetsMap = () => {
		const js = {};
		for (let [pos, racer] of this.state.bets) {
			if (racer) {
				js[pos] = racer.abbreviation;
			}
		}
		return js;
	};

	handleSubmit = async () => {
		const { user, onBetsSubmit } = this.props;

		const betInfo = new BetInfo({
			userInfo: user.toUserInfo(),
			betsMap: this.getBetsMap(),
		});

		await onBetsSubmit(betInfo);
		this.redirectToResults();
	};

	handleSelect = (racer, pos) => {
		const { bets } = this.state;

		this.setState({
			bets: bets.set(pos, racer),
		});
		this.forceUpdate();
	};

	render() {
		const tableData = [];

		for (let [pos, racer] of this.state.bets) {
			tableData.push({
				pos,
				racer,
			});
		}

		const { racers, user } = this.props;
		const availableRacers = racers.filter(({ name }) => {
			return !tableData.filter(({ racer }) => Boolean(racer)).some(({ racer }) => racer.name === name);
		});

		return user ? (
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
											pos={pos}
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
				<FormGroup>
					<Button onClick={this.handleSubmit} color="primary">
						Сохранить прогноз
					</Button>
				</FormGroup>
			</Form>
		) : null;
	}

	redirectToResults() {
		this.props.history.replace(pathNames.RESULTS);
	}
}

export default withRouter(BetsForm);
