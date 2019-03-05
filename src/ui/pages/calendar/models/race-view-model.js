export default class RaceViewModel {
	constructor({ raceName, raceTime, qualTime, practice1Time, practice2Time, practice3Time, id }) {
		this.raceName = raceName;
		this.raceTime = raceTime;
		this.qualTime = qualTime;
		this.practice1Time = practice1Time;
		this.practice2Time = practice2Time;
		this.practice3Time = practice3Time;
		this.raceId = id;
	}
}
