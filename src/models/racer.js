import { observable, action, runInAction } from "mobx";

class RacerListModel {
	constructor({ operationManager, racerService }) {
		this._operationManager = operationManager;
		this._racerService = racerService;
		this._loadRacers();
	}

	/**
	 * @type {Racer[]}
	 */
	@observable racers = [];

	@action
	async _loadRacers() {
		return this._operationManager.runWithProgressAsync(async () => {
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
