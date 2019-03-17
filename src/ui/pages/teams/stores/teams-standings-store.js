import { observable, runInAction } from "mobx";

import ErgastApi from "../../../../lib/ergast-api";
import TeamsStanding from "../models/team-standing";

class TeamsStandingsStore {
	/**
	 * @param {AppModel} appModel
	 */
	constructor(appModel) {
		this._appModel = appModel;
	}

	@observable teamsStandingList = [];

	/**
	 * @return {string}
	 */
	get currentSeason() {
		return this._appModel.currentSeason;
	}

	fetchStandings = () => {
		return this._appModel.operationManager.runWithProgressAsync(async () => {
			const constructorStandings = await ErgastApi.getConstructorStandings(this.currentSeason);

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
		});
	};
}

export default TeamsStandingsStore;
