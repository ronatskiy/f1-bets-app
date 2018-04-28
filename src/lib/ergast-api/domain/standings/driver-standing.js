import Constructor from "../constructor";
import Driver from "../driver";
import StandingBase from "./standing-base";

/**
 * @class DriverStanding
 * @extends StandingBase
 * @property {ErgastApi~Driver} driver
 * @property {ErgastApi~Constructor[]} constructors
 */
export default class DriverStanding extends StandingBase {
	/**
	 *
	 * @param {Object} options
	 * @param options.Driver
	 * @param options.Constructors
	 */
	constructor(options) {
		super(options);
		this.driver = new Driver(options.Driver);
		this.constructors = options.Constructors.map(ctor => new Constructor(ctor));
	}
}
