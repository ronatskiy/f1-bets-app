import { action, observable, computed } from "mobx";

export default class GridSelectorStore {
	constructor({ racers, onSave, initData = {}, gridPositionsCount = 10 }) {
		this._initMap(racers, initData, gridPositionsCount);
		this._racers = racers;
		this._onSave = onSave;
	}

	@observable _map = new Map();

	@computed
	get gridMapAsJS() {
		const js = {};

		for (let [pos, racer] of this._map) {
			if (racer) {
				js[pos] = racer.code;
			}
		}

		return js;
	}

	@computed
	get tableData() {
		return Array.from(this._map).map(([pos, racer]) => ({ pos, racer }));
	}

	@computed
	get availableRacers() {
		return this._racers.filter(({ name }) => {
			return !this.tableData.filter(({ racer }) => Boolean(racer)).some(({ racer }) => racer.name === name);
		});
	}

	@action
	handleSelect = (racer, pos) => {
		this._map.set(pos, racer);
	};

	handleSubmit = () => {
		return this._onSave(this.gridMapAsJS);
	};

	@action
	_initMap(racers, initData, gridPositionsCount) {
		console.log(racers);
		console.log(initData);

		Array(gridPositionsCount)
			.fill(null)
			.forEach((_, index) => {
				const racer = racers.find(r => r.code === initData[index + 1]);
				this.handleSelect(racer || null, index + 1);
			});
	}
}
