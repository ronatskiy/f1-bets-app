import React, { Component } from "react";
import { inject, observer } from "mobx-react/index";
import { Button, Col, Row, Table } from "reactstrap";

import { RaceRepository } from "../../../../storage";
import { prettifyDate } from "../../../utilities";

@inject(stores => ({
	races: stores.rootStore.racesStore.races,
	fetchRaces: () => stores.rootStore.racesStore.fetchRaces(),
}))
@observer
class RaceSection extends Component {
	handleInitRacesCollection = async () => {
		await RaceRepository.init();
		await this.props.fetchRaces();
	};

	handleAddNewRace = () => {};

	render() {
		const { races } = this.props;
		return (
			<section style={{ marginTop: "10px" }}>
				<Row>
					<Col className="command-buttons-container">
						<Button
							size="sm"
							color="info"
							className="command-button"
							onClick={this.handleInitRacesCollection}
						>
							Init Races
						</Button>
						<Button size="sm" color="info" className="command-button" onClick={this.handleAddNewRace}>
							Add New Race
						</Button>
					</Col>
				</Row>
				<Row>
					<Col>
						<Table bordered size="sm">
							<thead>
								<tr>
									<th>№</th>
									<th>Title</th>
									<th>Date</th>
									<th>Bets</th>
								</tr>
							</thead>
							<tbody>
								{races.map((race, index) => {
									const { title, raceStartTime, qualifyingStartTime, bets } = race;

									return (
										<tr key={title}>
											<td>{index + 1}</td>
											<td>{title}</td>
											<td>
												<div>Qual: {prettifyDate(qualifyingStartTime)}</div>
												<div>Race: {prettifyDate(raceStartTime)}</div>
											</td>
											<td>We have {bets.length} bets</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</Col>
				</Row>
				<Row>
					<Col>
						Details:{" "}
						<a target="_blank" href={RaceRepository.DATA_STORE_URL}>
							{RaceRepository.DATA_STORE_URL}
						</a>
					</Col>
				</Row>
			</section>
		);
	}
}

export default RaceSection;
