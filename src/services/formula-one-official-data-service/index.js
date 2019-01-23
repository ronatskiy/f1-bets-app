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
	 * @return {Promise<ExtendedRoundInfo[]>}
	 */
	async fetchSeasonRoundsSchedule() {
		try {
			const roundSchedules = await this._repository.getF1Calendar();
			const raceTable = await this._repository.getRaceSchedule();

			return raceTable.races.map(race => createExtendedRoundInfo(race, roundSchedules));
		} catch (e) {
			console.error(e.message);
		}
	}

	/**
	 * @return {Promise<RaceResult[]>}
	 */
	async fetchRacesResults() {
		try {
			const raceTableExtended = await this._repository.getRacesResults();

			return raceTableExtended.races.map(race => createRaceResult(race));
		} catch (e) {
			console.error(e.message);
		}
	}

	/**
	 * @return {Promise<Racer[]>}
	 */
	async fetchRacers() {
		try {
			const driverTable = await this._repository.getDrivers();

			return driverTable.drivers.map(driver =>
				Racer.create({
					...driver,
					firstName: driver.givenName,
					lastName: driver.familyName,
				}),
			);
		} catch (e) {
			console.error(e.message);
		}
	}
}