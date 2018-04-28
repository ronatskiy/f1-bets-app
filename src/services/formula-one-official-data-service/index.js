import createExtendedRoundInfo from "./helpers/create-extended-round-info";

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
		const roundSchedules = await this._repository.getF1Calendar();
		const raceTable = await this._repository.getRaceSchedule();

		return raceTable.races.map(race => createExtendedRoundInfo(race, roundSchedules));
	}
}
