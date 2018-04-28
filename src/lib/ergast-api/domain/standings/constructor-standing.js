import Constructor from "../constructor";
import StandingBase from "./standing-base";

/**
 * @extends StandingBase
 * @property {ErgastApi~Constructor} constructor
 */
export default class ConstructorStanding extends StandingBase {
	constructor(options) {
		super(options);
		this.constructor = new Constructor(options.Constructor);
	}
}
