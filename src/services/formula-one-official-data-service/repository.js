import ErgastApi from "../../lib/ergast-api";
import calendarData from "./calendar-data";

export default class FormulaOneOfficialDataRepository {
	/**
	 * @return {Promise<RoundSchedule[]>}
	 */
	getF1Calendar() {
		return Promise.resolve(calendarData);
	}

	/**
	 * @param {string} season
	 * @return {Promise<RaceTable>}
	 */
	async getRaceSchedule(season = "2018") {
		return await ErgastApi.getRaceSchedule(season);
	}

	/**
	 * @param {string} season
	 * @return {Promise<RaceTableExtended>}
	 */
	async getRacesResults(season = "2018") {
		return await ErgastApi.getAllRacesResults(season);
	}
}
