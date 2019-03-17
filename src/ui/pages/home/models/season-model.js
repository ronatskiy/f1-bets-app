class SeasonViewModel {
	constructor({ season = "", isLoaded = false, weekends = [] }) {
		this.season = season;
		this.isLoaded = isLoaded;
		this.weekends = weekends;
	}
}

export default SeasonViewModel;
