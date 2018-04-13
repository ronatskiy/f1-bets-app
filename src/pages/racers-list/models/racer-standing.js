class RacerStanding {
	constructor({
		racerId,
		racerFullName,
		racerPoints,
		racerUrl,
		racerNumber,
		racerNationality,
		constructorName,
		constructorUrl,
	}) {
		this.racerId = racerId;
		this.racerFullName = racerFullName;
		this.racerUrl = racerUrl;
		this.racerPoints = racerPoints;
		this.racerNumber = racerNumber;
		this.racerNationality = racerNationality;
		this.constructorUrl = constructorUrl;
		this.constructorName = constructorName;
	}
}
export default RacerStanding;
