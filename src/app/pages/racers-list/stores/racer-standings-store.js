import { observable } from "mobx";

import ErgastApi from "../../../lib/ergast-api";
import RacerStanding from "../models/racer-standing";

class RacerStandingsStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this._fetchRacerStandings();
	}

	@observable racerStandingList = [];

	async _fetchRacerStandings() {
		try {
			this.rootStore.pendingTasksCount++;
			const driverStandings = await ErgastApi.getDriverStandings("2018");

			/**@var {DriverStandingsListItem} standingsListItem */
			const [standingsListItem] = driverStandings.standingsLists;

			if (standingsListItem) {
				this.racerStandingList = standingsListItem.driverStandings.map(driverStanding => {
					/**@var {ErgastApi~Driver} driver */
					const driver = driverStanding.driver;
					const [constructor] = driverStanding.constructors;

					return new RacerStanding({
						pos: driverStanding.position,
						racerFullName: `${driver.givenName} ${driver.familyName}`,
						racerPoints: driverStanding.points,
						racerId: driver.code,
						racerNumber: driver.permanentNumber,
						racerUrl: driver.url,
						constructorName: constructor.name,
						constructorUrl: constructor.url,
						racerNationality: driver.nationality,
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

export default RacerStandingsStore;
