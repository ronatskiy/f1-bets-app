import { observable, runInAction } from "mobx";

import ErgastApi from "../../../../lib/ergast-api";
import RacerStanding from "../models/racer-standing";

class RacerStandingsStore {
	/**
	 * @param {AppModel} appModel
	 */
	constructor(appModel) {
		this._appModel = appModel;
	}

	@observable racerStandingList = [];

	/**
	 * @return {string}
	 */
	get currentSeason() {
		return this._appModel.formulaOneOfficial.currentSeason;
	}

	loadRacerStandings = () => {
		return this._appModel.operationManager.runWithProgressAsync(async () => {
			const driverStandings = await ErgastApi.getDriverStandings(this.currentSeason);

			/**@var {DriverStandingsListItem} standingsListItem */
			const [standingsListItem] = driverStandings.standingsLists;

			if (standingsListItem) {
				const racerStandingList = standingsListItem.driverStandings.map(driverStanding => {
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
						constructorName: constructor ? constructor.name : "",
						constructorUrl: constructor ? constructor.url : "",
						racerNationality: driver.nationality,
					});
				});

				runInAction(() => {
					this.racerStandingList = racerStandingList;
				});
			}
		});
	};
}

export default RacerStandingsStore;
