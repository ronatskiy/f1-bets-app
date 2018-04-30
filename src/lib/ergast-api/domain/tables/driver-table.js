import SeasonInfo from "../season-info";
import Driver from "../driver";
/**
 * @name DriverTable
 * @memberOf ErgastApi
 * @extends ErgastApi.SeasonInfo
 * @property {ErgastApi.Driver[]} drivers
 */
export default class DriverTable extends SeasonInfo {
	/**
	 * @param {Object} options
	 * @param {string} options.season
	 * @param {ErgastApi~DriverRawData[]} options.Drivers
	 */
	constructor(options) {
		super(options);
		this.drivers = options.Drivers.map(driverData => new Driver(driverData));
	}
}
