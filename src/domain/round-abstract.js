import kebabCase from "lodash.kebabcase";

export class RoundAbstract {
	constructor({ season, raceName }) {
		this.season = season;
		this.raceName = raceName;
		this.roundId = kebabCase(`${this.raceName} ${this.season}`);
	}
}
