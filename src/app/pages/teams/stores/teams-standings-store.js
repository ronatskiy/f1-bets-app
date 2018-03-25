import { observable } from "mobx";
import ErgastApi from "../../../lib/ergast-api";

export class TeamsStanding {
	constructor({ pos, name, constructorId, points, url }) {
		this.pos = pos;
		this.name = name;
		this.constructorId = constructorId;
		this.points = points;
		this.url = url;
	}
}

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
						constructorId: constructor.constructorId,
						points: constructorStanding.points,
						url: constructor.url,
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
