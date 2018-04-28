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
	 * @return {Promise<RaceTable>}
	 */
	async getRaceSchedule(season = "2018") {
		return await ErgastApi.getRaceSchedule(season);
	}
}
