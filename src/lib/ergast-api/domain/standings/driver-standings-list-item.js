import StandingsListItem from "./standings-list-item";
import DriverStanding from "./driver-standing";

/**
 * @extends StandingsListItem
 * @property {DriverStanding[]} driverStandings
 */
export default class DriverStandingsListItem extends StandingsListItem {
	/**
	 * @param {Object} options
	 * @param {string} options.season
	 * @param {string} options.round
	 * @param {DriverStanding} options.DriverStandings
	 */
	constructor(options) {
		super(options);
		this.driverStandings = options.DriverStandings.map(ds => new DriverStanding(ds));
	}
}
