import ErgastApi from "../../lib/ergast-api";
import calendatData from "./calendar-data";

export default class FormulaOneOfficialDataService {
	/**
	 * @return {Promise<ErgastApi~Race[]>}
	 */
	async fetchRaceScheduleInfo() {
		const raceSchedules = await ErgastApi.getRaceScheduleInfo();

		return raceSchedules.races;
	}

	findCalendarByRoundNumber(round = 1) {
		return calendatData.find(item => item.round === Number(round));
	}
}
