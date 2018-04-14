import { action, observable, computed } from "mobx";

export default class GridSelectorStore {
	constructor({ racers, onSave, initData = {}, gridPositionsCount = 10 }) {
		this._racers = racers;
		this._onSave = onSave;

		this.map = observable.shallowMap(
			Array(gridPositionsCount)
				.fill(null)
				.map((item, index) => {
					const racer = racers.find(r => r.abbreviation === initData[index + 1]);

					return [index + 1, racer || null];
				}),
		);
	}

	@computed
	get gridMapAsJS() {
		const js = {};

		for (let [pos, racer] of this.map) {
			if (racer) {
				js[pos] = racer.abbreviation;
			}
		}

		return js;
	}

	@computed
	get tableData() {
		return this.map.entries().map(([pos, racer]) => ({ pos, racer }));
	}

	@computed
	get availableRacers() {
		return this._racers.filter(({ name }) => {
			return !this.tableData.filter(({ racer }) => Boolean(racer)).some(({ racer }) => racer.name === name);
		});
	}

	@action
	handleSelect = (racer, pos) => {
		this.map.set(pos, racer);
	};

	handleSubmit = () => {
		return this._onSave(this.gridMapAsJS);
	};
}
