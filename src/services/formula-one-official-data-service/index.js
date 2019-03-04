import createExtendedRoundInfo from "./helpers/create-extended-round-info";
import { createRaceResult } from "../data-transforms/race-with-results-transform";
import Racer from "../../domain/racer";

export default class FormulaOneOfficialDataService {
	/**
	 * @param {FormulaOneOfficialDataRepository} formulaOneOfficialDataRepository
	 */
	constructor({ formulaOneOfficialDataRepository }) {
		this._repository = formulaOneOfficialDataRepository;
	}

	/**
	 * @param {string} season
	 * @return {Promise<FormulaOneRound[]>}
	 */
	async fetchSeasonRoundsSchedule(season) {
		const roundSchedules = await this._repository.getF1Calendar(season);
		const raceTable = await this._repository.getRaceSchedule(season);

		return raceTable.races.map(race => createExtendedRoundInfo(race, roundSchedules));
	}

	/**
	 * @param {string} season
	 * @return {Promise<RaceResult[]>}
	 */
	async fetchRacesResults(season) {
		const raceTableExtended = await this._repository.getRacesResults(season);

		return raceTableExtended.races.map(race => createRaceResult(race));
	}

	/**
	 * @param {string} season
	 * @return {Promise<Racer[]>}
	 */
	async fetchRacers(season) {
		const [driverStandingsList] = await this._repository.getDrivers(season);

		return driverStandingsList.driverStandings.map(({ driver }) =>
			Racer.create({
				...driver,
				firstName: driver.givenName,
				lastName: driver.familyName,
				abbreviation: driver.code,
				number: driver.permanentNumber,
			}),
		);
	}
}
