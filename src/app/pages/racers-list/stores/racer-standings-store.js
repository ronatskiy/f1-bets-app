import { observable } from "mobx";
import ErgastApi from "../../../lib/ergast-api";

export class RacerStanding {
	constructor({ pos, fullName, code, points, racerUrl, permanentNumber }) {
		this.pos = pos;
		this.fullName = fullName;
		this.code = code;
		this.points = points;
		this.racerUrl = racerUrl;
		this.permanentNumber = permanentNumber;
	}
}

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
			const standingsListItem = driverStandings.standingsLists[0];
			if (standingsListItem) {
				this.racerStandingList = standingsListItem.driverStandings.map(driverStanding => {
					/**@var {Driver} driver */
					const driver = driverStanding.driver;

					return new RacerStanding({
						pos: driverStanding.position,
						fullName: `${driver.givenName} ${driver.familyName}`,
						points: driverStanding.points,
						code: driver.code,
						permanentNumber: driver.permanentNumber,
						racerUrl: driver.url,
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
