/**
 * @property {string} season
 * @property {string} raceName
 * @property {string} raceUrl
 * @property {{ countryName: string, url: string, circuitName: string }} circuit
 * @property {{ practices: string[], qualification: string, race: string }} roundSchedule
 */
export default class ExtendedRoundInfo {
	/**
	 * @param {string} season
	 * @param {string} raceName
	 * @param {string} raceUrl
	 * @param {{ countryName: string, url: string, circuitName: string }} circuit
	 * @param {{ practices: string[], qualification: string, race: string }} roundSchedule
	 */
	constructor({ season, raceName, raceUrl, circuit, roundSchedule }) {
		this.season = season;
		this.raceName = raceName;
		this.raceUrl = raceUrl;
		this.circuit = circuit;
		this.roundSchedule = roundSchedule;
	}
}
