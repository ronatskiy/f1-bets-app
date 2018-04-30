import Racer from "../../../domain/racer";
import { getFlagUrl } from "../../../lib/country-flags";

export default class RacerViewModel extends Racer {
	constructor({ firstName, lastName, number, abbreviation, points, nationality }) {
		super(firstName, lastName, number, abbreviation, points, nationality);
	}

	get flagUrl() {
		return getFlagUrl(this.nationality);
	}
}
