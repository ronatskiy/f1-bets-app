import { observable, action, runInAction } from "mobx";

import ErgastApi from "../../../lib/ergast-api";
import RacerStanding from "../models/racer-standing";

class RacerStandingsStore {
	/**
	 * @param {AppViewModel} viewModel
	 */
	constructor(viewModel) {
		this._appViewModel = viewModel;
		this._fetchRacerStandings();
	}

	@observable racerStandingList = [];

	@action
	async _fetchRacerStandings() {
		return this._appViewModel.worker.operationWithProgressAsync(async () => {
			try {
				const driverStandings = await ErgastApi.getDriverStandings("2018");

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
							constructorName: constructor.name,
							constructorUrl: constructor.url,
							racerNationality: driver.nationality,
						});
					});

					runInAction(() => {
						this.racerStandingList = racerStandingList;
					});
				}
			} catch (error) {
				console.error(error);
			}
		});
	}
}

export default RacerStandingsStore;
