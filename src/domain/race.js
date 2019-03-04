import BetInfo from "./bet-info";
import UserInfo from "./user-info";
import words from "lodash.words";
import capitalize from "lodash.capitalize";
import FormulaOneRound from "./formula-one-round";

class Race extends FormulaOneRound {
	constructor({ season, raceName, raceUrl, circuit, roundSchedule, bets = [], raceResults = {} }) {
		super({ season, raceName, raceUrl, circuit, roundSchedule });

		this.bets = bets.map(bet => {
			const {
				userInfo: { name, id },
				betsMap,
			} = bet;

			return new BetInfo({ userInfo: new UserInfo({ name, id }), betsMap });
		});
		this.raceResults = raceResults;
	}

	get raceStartTime() {
		return this.roundSchedule.race;
	}

	get qualifyingStartTime() {
		return this.roundSchedule.qualification;
	}

	get prettyTitle() {
		return words(this.raceName)
			.map(capitalize)
			.join(" ");
	}
}

export default Race;
