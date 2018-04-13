import { observable, action, runInAction } from "mobx";

class RacerListModel {
	constructor({ worker, racerService }) {
		this._worker = worker;
		this._racerService = racerService;
		this._loadRacers();
	}

	@observable racers = [];

	@action
	async _loadRacers() {
		return this._worker.operationWithProgressAsync(async () => {
			try {
				const racers = await this._racerService.fetchAll();

				runInAction(() => {
					this.racers = racers;
				});
			} catch (error) {
				console.log("Can't load 'racers' in 'RacerListModel'!!\n", error);
			}
		});
	}
}

export default RacerListModel;
