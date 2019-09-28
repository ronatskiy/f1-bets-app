import { fetch, fetchAll } from "./helpers/fetch";
import { DriverStandingsTable, RaceTable, ConstructorStandingsTable, RaceTableExtended, DriverTable } from "./domain";

const API_ENDPOINT = "https://ergast.com/api/f1";

/** @namespace ErgastApi */
class ErgastApi {
	/**
	 * @static
	 * @param {...string} args
	 * @return {string}
	 * @private
	 */
	static _createJsonUrl(...args) {
		return `${API_ENDPOINT}/${args.filter(e => Boolean(e)).join("/")}.json`;
	}

	/**
	 * @static
	 * @param {string} season
	 * @return {Promise<DriverStandingsTable>}
	 */
	static async getDriverStandings(season) {
		// https://ergast.com/api/f1/2018/driverStandings
		const mrData = await fetch(ErgastApi._createJsonUrl(season, "driverStandings"));

		return new DriverStandingsTable(mrData.StandingsTable);
	}
	/**
	 * @static
	 * @param {string} season
	 * @return {Promise<ConstructorStandingsTable>}
	 */
	static async getConstructorStandings(season) {
		// https://ergast.com/api/f1/2018/constructorStandings
		const mrData = await fetch(ErgastApi._createJsonUrl(season, "constructorStandings"));

		return new ConstructorStandingsTable(mrData.StandingsTable);
	}

	/**
	 * @static
	 * @param {string} season
	 * @param {string | "all"} round
	 * @return {Promise<RaceTable>}
	 */
	static async getRaceSchedule(season = "2018", round = "all") {
		// http://ergast.com/api/f1/{season}/{round}
		const mrData = await fetch(ErgastApi._createJsonUrl(season, round !== "all" ? round : undefined));

		return new RaceTable(mrData.RaceTable);
	}

	/**
	 * @static
	 * @param {string} round
	 * @param {string} season
	 * @return {Promise<RaceTableExtended>}
	 */
	static async getRaceResults(round, season = "2018") {
		// http://ergast.com/api/f1/{season}/{round}
		const mrData = await fetch(ErgastApi._createJsonUrl(season, round, "results"));

		return new RaceTableExtended(mrData.RaceTable);
	}
	/**
	 * @static
	 * @param {string} season
	 * @return {Promise<RaceTableExtended>}
	 */
	static async getAllRacesResults(season = "2018") {
		// http://ergast.com/api/f1/{season}/results
		const mrData = await fetchAll(ErgastApi._createJsonUrl(season, "results"));

		return new RaceTableExtended(mrData.RaceTable);
	}

	/**
	 * @static
	 * @param {string} season
	 * @return {Promise<DriverTable>}
	 */
	static async getDrivers(season = "2018") {
		// http://ergast.com/api/f1/{season}/drivers.json
		const mrData = await fetch(ErgastApi._createJsonUrl(season, "drivers"));

		return new DriverTable(mrData.DriverTable);
	}

	/**
	 * @static
	 * @param {string} season
	 * @return {Promise<RaceTableExtended>}
	 */
	static async getQualifyingResults(season = "2018") {
		// http://ergast.com/api/f1/{season}/qualifying
		const mrData = await fetchAll(ErgastApi._createJsonUrl(season, "qualifying"));

		return new RaceTable(mrData.RaceTable);
	}
}

export default ErgastApi;
