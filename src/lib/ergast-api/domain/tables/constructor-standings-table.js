import StandingsTable from "./standings-table";
import ConstructorStandingsListItem from "../standings/constructor-standings-list-item";

/**
 * @property {string} season
 * @property {ConstructorStandingsListItem[]} standingsLists
 */
export default class ConstructorStandingsTable extends StandingsTable {
	/**
	 *
	 * @param {string} season
	 * @param {ConstructorStandingsListItem[]} StandingsLists
	 */
	constructor({ season, StandingsLists }) {
		super({ season, StandingsLists });
		this.standingsLists = StandingsLists.map(item => new ConstructorStandingsListItem(item));
	}
}
