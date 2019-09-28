import Driver from "./driver";
import Constructor from "./constructor";

/**
 * @name QualifyingResult
 * @memberOf ErgastApi
 */
export class QualifyingResult {
	constructor(options) {
		const { number, position } = options;

		this.number = number;
		this.position = position;
		this.driver = new Driver(options.Driver);
		this.constructor = new Constructor(options.Constructor);
	}
}
