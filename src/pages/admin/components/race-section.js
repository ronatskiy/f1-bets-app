import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Button, Col, Row, Table } from "reactstrap";

import { prettifyDate } from "../../../components/helpers/prettify-date";
import GridSelector from "../../../components/grid-selector";
import RaceSelect from "./race-select";

@inject(stores => ({
	racesSectionStore: stores.adminPageStore.racesSectionStore,
}))
@observer
class RaceSection extends Component {
	handleAddNewRace = () => {};
	handleAddRaceResults = () => {
		this.props.racesSectionStore.showRaceResultsPanel();
	};

	handleInitRacesCollection = () => {
		this.props.racesSectionStore.initRacesCollection();
	};

	handleGridSelectorSave = async gridInfo => {
		return await this.props.racesSectionStore.addOrUpdateRaceResults(gridInfo);
	};

	handleRaceSelect = race => {
		this.props.racesSectionStore.selectedRace = race;
	};

	render() {
		const { storeApiUrl, isRaceResultsPanelVisible, selectedRace, races, racers } = this.props.racesSectionStore;

		return (
			<section style={{ marginTop: "10px" }}>
				<Row>
					<Col className="command-buttons-container">
						<Button
							size="sm"
							color="info"
							className="command-button"
							disabled
							onClick={this.handleInitRacesCollection}
						>
							Init Races
						</Button>
						<Button size="sm" color="info" className="command-button" onClick={this.handleAddNewRace}>
							Add New Race
						</Button>
						<Button size="sm" color="info" className="command-button" onClick={this.handleAddRaceResults}>
							Add Race Results
						</Button>
					</Col>
				</Row>
				{isRaceResultsPanelVisible && [
					<Row key={"11"}>
						<Col md={2}>Выберите гонку:</Col>
						<Col>
							<RaceSelect
								value={selectedRace}
								onSelect={this.handleRaceSelect}
								raceList={races.slice()}
							/>
						</Col>
					</Row>,
					<Row key={"22"}>
						<Col>
							<GridSelector racers={racers.slice()} onSave={this.handleGridSelectorSave} />
						</Col>
					</Row>,
				]}
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
						<a target="_blank" href={storeApiUrl}>
							{storeApiUrl}
						</a>
					</Col>
				</Row>
			</section>
		);
	}
}

export default RaceSection;
