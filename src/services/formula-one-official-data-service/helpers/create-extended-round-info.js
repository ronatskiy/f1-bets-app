import ExtendedRoundInfo from "../../../domain/extended-round-info";

/**
 * @param {ErgastApi.Race} race
 * @param {RoundSchedule[]} roundSchedules
 * @return {ExtendedRoundInfo}
 */
export default function createExtendedRoundInfo(race, roundSchedules) {
	const options = {
		season: race.season,
		raceName: race.raceName,
		raceUrl: race.url,
		circuit: {
			url: race.circuit.url,
			countryName: race.circuit.location.country,
			circuitName: race.circuit.circuitName,
		},
	};
	const roundSchedule = roundSchedules.find(({ round }) => round === Number(race.round));

	if (roundSchedule) {
		options.roundSchedule = {
			practices: [roundSchedule.practice_1, roundSchedule.practice_2, roundSchedule.practice_3],
			qualification: roundSchedule.qualification,
			race: roundSchedule.race,
		};
	}

	return new ExtendedRoundInfo(options);
}
