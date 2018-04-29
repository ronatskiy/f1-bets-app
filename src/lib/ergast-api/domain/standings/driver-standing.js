import Constructor from "../constructor";
import Driver from "../driver";
import StandingBase from "./standing-base";

/**
 * @name DriverStanding
 * @memberOf ErgastApi
 * @extends ErgastApi.StandingBase
 * @property {ErgastApi.Driver} driver
 * @property {ErgastApi.Constructor[]} constructors
 */
class DriverStanding extends StandingBase {
	/**
	 * @param {Object} options
	 * @param {ErgastApi~DriverRawData} options.Driver
	 * @param {ErgastApi~ConstructorRawData} options.Constructors
	 */
	constructor(options) {
		super(options);
		this.driver = new Driver(options.Driver);
		this.constructors = options.Constructors.map(ctor => new Constructor(ctor));
	}
}

export default DriverStanding;
