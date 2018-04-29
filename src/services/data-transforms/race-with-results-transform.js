import { driverTransform } from "./driver-transform";
import RaceResult from "../../domain/race-result";

/**
 * @param {ErgastApi.RaceWithResults} raceWithResults
 * @return {RaceResult}
 */
export function createRaceResult(raceWithResults) {
	const { season, round, results } = raceWithResults;

	return new RaceResult({
		season,
		round,
		racersStandings: results.map(
			/** @type {ErgastApi.RaceResults} */ raceResults => driverTransform(raceResults.driver, raceResults.points),
		),
	});
}
