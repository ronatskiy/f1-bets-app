import { computed } from "mobx";
import sortBy from "lodash.sortby";

import RaceInformation from "../models/race-information";
import UserStanding from "../models/user-standing";

class ResultsPageStore {
	/**
	 * @param {AppModel} appModel
	 */
	constructor(appModel) {
		this._appModel = appModel;
	}

	@computed
	get authenticatedUser() {
		return this._appModel.session.authenticatedUser;
	}

	@computed
	get raceResultsWithBets() {
		const { currentSeasonRacesResults } = this._appModel.formulaOneOfficial;

		return this._appModel._racesModel.races.map(
			(race, index) =>
				new RaceInformation({
					race,
					finishedRacers:
						index < currentSeasonRacesResults.length
							? currentSeasonRacesResults[index].racersStandings
							: undefined,
				}),
		);
	}

	@computed
	get userStandingsByRound() {
		const grandPrixesWithResults = this.raceResultsWithBets.filter(raceInfo => raceInfo.hasOfficialResults);
		const voteResults = grandPrixesWithResults.map(raceInfo => raceInfo.userVotes);
		const userStandingsByRound = voteResults.map((/** @type {UserBetsResult[]}*/ items, index) => ({
			title: "gp" + (index + 1),
			userStandings: items.map(
				userBetsResult =>
					new UserStanding({
						userId: userBetsResult.id,
						userName: userBetsResult.name,
						totalPoints: userBetsResult.userScore.value,
					}),
			),
		}));

		return userStandingsByRound;
	}

	@computed
	get userStandings() {
		const MAX_VALUABLE_RACE_COUNT = 7;

		const maxValuableUserStandings = Array.from(
			this.userStandingsByRound
				.reduce((acc, { userStandings }) => {
					userStandings.forEach(roundsUserScore => {
						acc.set(roundsUserScore.userId, [...(acc.get(roundsUserScore.userId) || []), roundsUserScore]);
					});

					return acc;
				}, new Map([]))
				.values(),
		).map(userStandings => {
			const arr = sortBy(userStandings, userStanding => userStanding.totalPoints);

			return arr.slice(Math.max(arr.length - MAX_VALUABLE_RACE_COUNT, 0));
		});

		const result = new Map([]);
		maxValuableUserStandings.forEach(userStandings => {
			userStandings.forEach(userStanding => {
				if (result.has(userStanding.userId)) {
					const newValue = userStanding;
					newValue.totalPoints += result.get(userStanding.userId).totalPoints;
					result.set(userStanding.userId, newValue);
				} else {
					result.set(userStanding.userId, userStanding);
				}
			});
		});

		return Array.from(result.values());
	}
}

export default ResultsPageStore;
