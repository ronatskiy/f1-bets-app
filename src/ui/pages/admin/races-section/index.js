import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Button, Col, Row, Table } from "../../../../vendors";

import { prettifyDate } from "../../../../helpers/prettify-date";
import GridSelector from "../../../components/grid-selector/grid-selector";
import AddBetButton from "./components/add-bet-button";

@inject(stores => ({
	racesSectionStore: stores.adminPageStore.racesSectionStore,
}))
@observer
class RaceSection extends Component {
	_handleAddRaceResults = race => {
		this.props.racesSectionStore.showRaceResultsPanel(race);
	};

	_handleGridSelectorSave = async gridInfo => {
		return await this.props.racesSectionStore.addOrUpdateRaceResults(gridInfo);
	};

	render() {
		const { storeApiUrl, selectedRace, races, racers } = this.props.racesSectionStore;

		return (
			<section className="mt-2">
				{selectedRace ? (
					<Row key={2}>
						<Col>
							<strong>{selectedRace.prettyTitle}</strong>
							<GridSelector
								gridPositionsCount={20}
								racers={racers}
								onSave={this._handleGridSelectorSave}
							/>
						</Col>
					</Row>
				) : (
					<Row>
						<Col>
							<Table bordered size="sm">
								<thead>
									<tr>
										<th>№</th>
										<th>Title</th>
										<th>Date</th>
										<th>Bets</th>
										<th>Commands</th>
									</tr>
								</thead>
								<tbody>
									{races.map((race, index) => {
										const { prettyTitle, raceStartTime, qualifyingStartTime, bets } = race;

										return (
											<tr key={prettyTitle}>
												<td>{index + 1}</td>
												<td>{prettyTitle}</td>
												<td>
													<div>Qual: {prettifyDate(qualifyingStartTime)}</div>
													<div>Race: {prettifyDate(raceStartTime)}</div>
												</td>
												<td>We have {bets.length} bets</td>
												<td>
													<AddBetButton race={race} />
													<Button size="sm" onClick={() => this._handleAddRaceResults(race)}>
														Add Race Results
													</Button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</Col>
					</Row>
				)}
				<Row>
					<Col>
						Details:{" "}
						<a target="_blank" rel="noopener noreferrer" href={storeApiUrl}>
							{storeApiUrl}
						</a>
					</Col>
				</Row>
			</section>
		);
	}
}

export { default as RacesSectionStore } from "./races-section-store";
export default RaceSection;
