import StandingsTable from "./standings-table";
import ConstructorStandingsListItem from "../standings/constructor-standings-list-item";

/**
 * @name ConstructorStandingsTable
 * @memberOf ErgastApi
 * @extends ErgastApi.StandingsTable
 * @property {ErgastApi.ConstructorStandingsListItem[]} standingsLists
 */
export default class ConstructorStandingsTable extends StandingsTable {
	/**
	 * @param {Object} options
	 * @param {string} options.season
	 * @param {ErgastApi.ConstructorStandingsListItem[]} options.StandingsLists
	 */
	constructor({ season, StandingsLists }) {
		super({ season, StandingsLists });
		this.standingsLists = StandingsLists.map(item => new ConstructorStandingsListItem(item));
	}
}
