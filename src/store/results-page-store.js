import { computed } from "mobx";
import BetInfo from "../storage/types/bet-info";
import UserInfo from "../storage/types/user-info";

class ResultsPageSrore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@computed
	get currentUser() {
		return this.rootStore.sessionStore.currentUser;
	}

	@computed
	get allBetsData() {
		return this.rootStore.racesStore.races.map(race => {
			const resultTitle = "Formula 1 (Official)";
			const { results } = race.officialData;
			const userBets = [];

			if (results) {
				userBets.push(
					new BetInfo({
						userInfo: new UserInfo({ name: resultTitle, id: "official-results" }),
						betsMap: results,
					}),
				);
			}

			return {
				raceId: race.id,
				raceTitle: race.prettyTitle,
				usersBets: [...userBets, ...race.bets],
			};
		});
	}
}

export default ResultsPageSrore;
