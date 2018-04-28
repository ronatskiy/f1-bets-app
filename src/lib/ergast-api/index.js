import axios from "axios";
import { DriverStandingsTable, RaceTable, ConstructorStandingsTable } from "./domain/index";

const API_ENDPOINT = "https://ergast.com/api/f1";

class ErgastApi {
	/**
	 * @param {...string} args
	 * @return {string}
	 * @private
	 */
	static _createJsonUrl(...args) {
		return `${API_ENDPOINT}/${args.filter(e => Boolean(e)).join("/")}.json`;
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

	/**
	 * @param {string} season
	 * @param {string | "all"} round
	 * @return {Promise<RaceTable>}
	 */
	static async getRaceSchedule(season = "2018", round = "all") {
		// http://ergast.com/api/f1/{season}/{round}
		const resp = await axios.get(ErgastApi._createJsonUrl(season, round !== "all" ? round : undefined));

		return new RaceTable(resp.data.MRData.RaceTable);
	}
}

export default ErgastApi;
