class Racer {
	constructor(firstName, lastName, number, abbreviation, points = 0, nationality = "", dateOfBirth = "") {
		this.firstName = firstName;
		this.lastName = lastName;
		this.number = number;
		this.abbreviation = abbreviation;
		this.points = points;
		this.nationality = nationality;
		this.dateOfBirth = dateOfBirth;
	}

	static create({ firstName, lastName, number, abbreviation, points = 0, nationality, dateOfBirth }) {
		return new Racer(firstName, lastName, number, abbreviation, points, nationality, dateOfBirth);
	}

	get name() {
		return `${this.firstName} ${this.lastName}`;
	}

	get shortName() {
		return `${this.firstName[0]}. ${this.lastName}`;
	}

	get code() {
		return this.abbreviation;
	}
}

export default Racer;
