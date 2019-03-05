import Racer from "../../../../domain/racer";
import { findFlagUrlByNationality } from "country-flags-svg";

export default class RacerViewModel extends Racer {
	constructor({ firstName, lastName, number, abbreviation, points, nationality }) {
		super(firstName, lastName, number, abbreviation, points, nationality);
	}

	get flagUrl() {
		return findFlagUrlByNationality(this.nationality);
	}
}
