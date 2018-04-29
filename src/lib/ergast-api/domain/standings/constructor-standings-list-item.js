import ConstructorStanding from "./constructor-standing";
import StandingsListItem from "./standings-list-item";

/**
 * @memberOf ErgastApi
 * @extends ErgastApi.StandingsListItem
 * @property {ErgastApi.ConstructorStanding[]} constructorStandings
 */
export default class ConstructorStandingsListItem extends StandingsListItem {
	constructor(options) {
		super(options);
		this.constructorStandings = options.ConstructorStandings.map(ds => new ConstructorStanding(ds));
	}
}
