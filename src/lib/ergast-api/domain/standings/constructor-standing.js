import Constructor from "../constructor";
import StandingBase from "./standing-base";

/**
 * @name ConstructorStanding
 * @memberOf ErgastApi
 * @extends ErgastApi.StandingBase
 * @property {ErgastApi.Constructor} constructor
 */
export default class ConstructorStanding extends StandingBase {
	constructor(options) {
		super(options);
		this.constructor = new Constructor(options.Constructor);
	}
}
