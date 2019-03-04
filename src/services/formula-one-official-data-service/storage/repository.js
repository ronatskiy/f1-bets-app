import ErgastApi from "../../../lib/ergast-api";
import calendarData from "./calendar-data";

export default class FormulaOneOfficialDataRepository {
	/**
	 * @param {string} season
	 * @return {Promise<RoundSchedule[]>}
	 */
	getF1Calendar(season) {
		const currentSeasonCalendarData = calendarData.get(season);
		return Promise.resolve(currentSeasonCalendarData);
	}

	/**
	 * @param {string} season
	 * @return {Promise<RaceTable>}
	 */
	async getRaceSchedule(season) {
		return await ErgastApi.getRaceSchedule(season);
	}

	/**
	 * @param {string} season
	 * @return {Promise<RaceTableExtended>}
	 */
	async getRacesResults(season) {
		return await ErgastApi.getAllRacesResults(season);
	}

	/**
	 * @param {string} season
	 * @return {Promise<DriverStandingsListItem[]>}
	 */
	async getDrivers(season) {
		return (await ErgastApi.getDriverStandings(season)).standingsLists;
	}
}
