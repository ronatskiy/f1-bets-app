import Constructor from "./constructor";
import Driver from "./driver";
import FastestLap from "./fastest-lap";

/**
 * @name RaceResults
 * @memberOf ErgastApi
 * @property {string} number
 * @property {string} position
 * @property {string} points
 * @property {ErgastApi.Driver} driver
 * @property {ErgastApi.Constructor} constructor
 * @property {string} grid
 * @property {string} laps
 * @property {string} status
 * @property {ErgastApi~Time} time
 * @property {ErgastApi.FastestLap} fastestLap
 */
export default class RaceResults {
	/**
	 * @param {ErgastApi~RaceResultsRawData} options
	 */
	constructor(options) {
		const { number, position, points, grid, laps, status, Time } = options;

		this.number = number;
		this.position = position;
		this.points = points;
		this.driver = new Driver(options.Driver);
		this.constructor = new Constructor(options.Constructor);
		this.grid = grid;
		this.laps = laps;
		this.status = status;
		this.time = { ...Time };
		this.fastestLap = options.FastestLap ? new FastestLap(options.FastestLap) : undefined;
	}
}

/**
 * @typedef {Object} ErgastApi~RaceResultsRawData
 * @property {string} number
 * @property {string} position
 * @property {string} points
 * @property {ErgastApi~DriverRawData} Driver
 * @property {ErgastApi~ConstructorRawData} Constructor
 * @property {string} grid
 * @property {string} laps
 * @property {string} status
 * @property {ErgastApi~Time} Time
 * @property {ErgastApi~FastestLap} FastestLap
 */
