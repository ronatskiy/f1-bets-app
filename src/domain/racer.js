class Racer {
	constructor(firstName, lastName, number, abbreviation, points = 0) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.number = number;
		this.abbreviation = abbreviation;
		this.points = points;
	}

	get name() {
		return `${this.firstName} ${this.lastName}`;
	}

	get shortName() {
		return `${this.firstName[0]}. ${this.lastName}`;
	}
}

export default Racer;
