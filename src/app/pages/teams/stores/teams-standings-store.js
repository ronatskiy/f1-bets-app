import { observable } from "mobx";

import ErgastApi from "../../../lib/ergast-api";
import TeamsStanding from "../models/team-standing";

class TeamsStandingsStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this._fetchStandings();
	}

	@observable teamsStandingList = [];

	async _fetchStandings() {
		try {
			this.rootStore.pendingTasksCount++;
			const constructorStandings = await ErgastApi.getConstructorStandings("2018");

			/**@var {ConstructorStandingsListItem} standingsListItem */
			const standingsListItem = constructorStandings.standingsLists[0];
			if (standingsListItem) {
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
			}

			this.rootStore.pendingTasksCount--;
		} catch (error) {
			console.error(error);
			this.rootStore.pendingTasksCount--;
		}
	}
}

export default TeamsStandingsStore;
