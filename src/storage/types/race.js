import BetInfo from "./bet-info";
import UserInfo from "./user-info";
import { generateRaceId } from "../generate-id";
import words from "lodash.words";
import capitalize from "lodash.capitalize";

class Race {
	constructor({ id, title, officialData, season = "2018", bets = [] }) {
		this.id = id || generateRaceId();
		this.title = title;
		this.season = season;
		this.officialData = officialData;
		this.bets = bets.map(bet => {
			const { userInfo: { name, id }, betsMap } = bet;

			return new BetInfo({ userInfo: new UserInfo({ name, id }), betsMap });
		});
	}

	get raceStartTime() {
		return this.officialData.race.start;
	}

	get qualifyingStartTime() {
		return this.officialData.qualifying.start;
	}

	get location() {
		return this.officialData.location;
	}

	get prettyTitle() {
		return words(this.title)
			.map(capitalize)
			.join(" ");
	}

	static fromJs({ id, title, officialData, season, bets }) {
		return new Race({ id, title, officialData, season, bets });
	}
}

export default Race;
