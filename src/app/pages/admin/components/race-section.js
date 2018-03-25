import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Button, Col, Row, Table } from "reactstrap";

import { prettifyDate } from "../../../utilities";
import GridSelector from "../../../components/grid-selector";
import RaceSelect from "./race-select";

@inject(stores => ({
	raceSectionStore: stores.rootStore.adminPageStore.raceSectionStore,
}))
@observer
class RaceSection extends Component {
	handleAddNewRace = () => {};
	handleAddRaceResults = () => {
		this.props.raceSectionStore.showRaceResultsPanel();
	};

	handleInitRacesCollection = () => {
		this.props.raceSectionStore.initRacesCollection();
	};

	handleGridSelectorSave = gridInfo => {
		this.props.raceSectionStore.addOrUpdateRaceResults(gridInfo);
	};

	handleRaceSelect = race => {
		this.props.raceSectionStore.selectedRace = race;
	};

	render() {
		const { raceStoreUrl, isRaceResultsPanelVisible, rootStore, selectedRace } = this.props.raceSectionStore;

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
								raceList={rootStore.racesStore.races.slice()}
							/>
						</Col>
					</Row>,
					<Row key={"22"}>
						<Col>
							<GridSelector racers={rootStore.racerStore.racers} onSave={this.handleGridSelectorSave} />
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
								{rootStore.racesStore.races.map((race, index) => {
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
						<a target="_blank" href={raceStoreUrl}>
							{raceStoreUrl}
						</a>
					</Col>
				</Row>
			</section>
		);
	}
}

export default RaceSection;
