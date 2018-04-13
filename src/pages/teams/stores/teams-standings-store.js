import { observable, action, runInAction } from "mobx";

import ErgastApi from "../../../lib/ergast-api";
import TeamsStanding from "../models/team-standing";

class TeamsStandingsStore {
	/**
	 * @param {AppViewModel} viewModel
	 */
	constructor(viewModel) {
		this._appViewModel = viewModel;
		this._fetchStandings();
	}

	@observable teamsStandingList = [];

	@action
	async _fetchStandings() {
		this._appViewModel.worker.operationWithProgressAsync(async () => {
			try {
				const constructorStandings = await ErgastApi.getConstructorStandings("2018");

				/**@var {ConstructorStandingsListItem} standingsListItem */
				const standingsListItem = constructorStandings.standingsLists[0];
				if (standingsListItem) {
					runInAction(() => {
						this.teamsStandingList = standingsListItem.constructorStandings.map(constructorStanding => {
							/**@var {Constructor} constructor */
							const constructor = constructorStanding.constructor;

							return new TeamsStanding({
								pos: constructorStanding.position,
								name: constructor.name,
								id: constructor.constructorId,
								points: constructorStanding.points,
								url: constructor.url,
								nationality: constructor.nationality,
							});
						});
					});
				}
			} catch (error) {
				console.error(error);
			}
		});
	}
}

export default TeamsStandingsStore;
