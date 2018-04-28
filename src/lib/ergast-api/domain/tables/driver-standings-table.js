import StandingsTable from "./standings-table";
import DriverStandingsListItem from "../standings/driver-standings-list-item";

/**
 * @extends StandingsTable
 * @property {DriverStandingsListItem[]} standingsLists
 */
export default class DriverStandingsTable extends StandingsTable {
	/**
	 * @param {Object} options
	 * @param {string} options.season
	 * @param {DriverStandingsListItem[]} options.StandingsLists
	 */
	constructor(options) {
		super(options);
		this.standingsLists = options.StandingsLists.map(item => new DriverStandingsListItem(item));
	}
}
