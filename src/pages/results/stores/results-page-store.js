import { computed } from "mobx";

import RaceInformation from "../models/race-information";
import UserStanding from "../models/user-standing";

class ResultsPageStore {
	/**
	 * @param {AppViewModel} viewModel
	 */
	constructor(viewModel) {
		this._appViewModel = viewModel;
	}

	@computed
	get authenticatedUser() {
		return this._appViewModel.session.authenticatedUser;
	}

	@computed
	get raceResultsWithBets() {
		const { racesResults } = this._appViewModel.formulaOneOfficial;
		return this._appViewModel.races.map(
			(race, index) =>
				new RaceInformation({
					race,
					racers: index < racesResults.length ? racesResults[index].racersStandings : undefined,
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
		const result = new Map([]);

		this.userStandingsByRound.forEach(({ userStandings }) => {
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
