import axios from "axios";

/**
 * @property {string} constructorId
 * @property {string} url
 * @property {string} name
 * @property {string} nationality
 */
class Constructor {
	constructor({ constructorId, url, name, nationality }) {
		this.constructorId = constructorId;
		this.url = url;
		this.name = name;
		this.nationality = nationality;
	}
}

/**
 * @property {string} driverId
 * @property {string} permanentNumber
 * @property {string} code
 * @property {string} url
 * @property {string} givenName
 * @property {string} familyName
 * @property {string} dateOfBirth
 * @property {string} nationality
 */
class Driver {
	constructor({ driverId, permanentNumber, code, url, givenName, familyName, dateOfBirth, nationality }) {
		this.driverId = driverId;
		this.permanentNumber = permanentNumber;
		this.code = code;
		this.url = url;
		this.givenName = givenName;
		this.familyName = familyName;
		this.dateOfBirth = dateOfBirth;
		this.nationality = nationality;
	}
}
/**
 * @property {string} position
 * @property {string} positionText
 * @property {string} points
 * @property {string} wins
 */
class StandingBase {
	constructor({ position, positionText, points, wins }) {
		this.position = position;
		this.positionText = positionText;
		this.points = points;
		this.wins = wins;
	}
}

/**
 * @extends StandingBase
 * @property {Constructor} constructor
 */
class ConstructorStanding extends StandingBase {
	constructor(options) {
		super(options);
		this.constructor = new Constructor(options.Constructor);
	}
}

/**
 * @extends StandingBase
 * @property {Driver} driver
 * @property {Constructor[]} constructors
 */
class DriverStanding extends StandingBase {
	constructor(options) {
		super(options);
		this.driver = new Driver(options.Driver);
		this.constructors = options.Constructors.map(ctor => new Constructor(ctor));
	}
}

/**
 * @property {string} season
 * @property {string} round
 */
class StandingsListItem {
	constructor({ season, round }) {
		this.season = season;
		this.round = round;
	}
}

/**
 * @extends StandingsListItem

 * @property {DriverStanding[]} driverStandings
 */
class DriverStandingsListItem extends StandingsListItem {
	constructor(options) {
		super(options);
		this.driverStandings = options.DriverStandings.map(ds => new DriverStanding(ds));
	}
}

/**
 * @extends StandingsListItem
 * @property {ConstructorStanding[]} constructorStandings
 */
class ConstructorStandingsListItem extends StandingsListItem {
	constructor(options) {
		super(options);
		this.constructorStandings = options.ConstructorStandings.map(ds => new ConstructorStanding(ds));
	}
}

/**
 * @property {string} season
 * @property {array} standingsLists
 */
class StandingsTable {
	constructor({ season, StandingsLists }) {
		this.season = season;
		this.standingsLists = StandingsLists.map(item => item);
	}
}

/**
 * @extends StandingsTable
 * @property {DriverStandingsListItem[]} standingsLists
 */
class DriverStandingsTable extends StandingsTable {
	constructor({ season, StandingsLists }) {
		super({ season, StandingsLists });
		this.standingsLists = StandingsLists.map(item => new DriverStandingsListItem(item));
	}
}

/**
 * @property {string} season
 * @property {ConstructorStandingsListItem[]} standingsLists
 */
class ConstructorStandingsTable extends StandingsTable {
	constructor({ season, StandingsLists }) {
		super({ season, StandingsLists });
		this.standingsLists = StandingsLists.map(item => new ConstructorStandingsListItem(item));
	}
}

const API_ENDPOINT = "https://ergast.com/api/f1";

class ErgastApi {
	/**
	 * @param {string[]} args
	 * @return {string}
	 * @private
	 */
	static _createJsonUrl(...args) {
		return `${API_ENDPOINT}/${args.join("/")}.json`;
	}

	/**
	 * getDriverStandings
	 * @param {string} season
	 * @return {Promise<DriverStandingsTable>}
	 */
	static async getDriverStandings(season) {
		// https://ergast.com/api/f1/2018/driverStandings
		const data = (await axios.get(ErgastApi._createJsonUrl(season, "driverStandings"))).data;

		return new DriverStandingsTable(data.MRData.StandingsTable);
	}
	/**
	 * getDriverStandings
	 * @param {string} season
	 * @return {Promise<ConstructorStandingsTable>}
	 */
	static async getConstructorStandings(season) {
		// https://ergast.com/api/f1/2018/constructorStandings
		const data = (await axios.get(ErgastApi._createJsonUrl(season, "constructorStandings"))).data;

		return new ConstructorStandingsTable(data.MRData.StandingsTable);
	}
}

export default ErgastApi;
