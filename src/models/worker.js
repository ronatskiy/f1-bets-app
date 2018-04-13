import { observable, action, runInAction } from "mobx";

export default class WorkerModel {
	@observable pendingTasksCount = 0;

	@action
	operationWithProgress(fn) {
		this.pendingTasksCount++;
		fn();
		this.pendingTasksCount--;
	}

	@action
	async operationWithProgressAsync(fn) {
		this.pendingTasksCount++;

		try {
			const result = await fn();
			runInAction(() => {
				this.pendingTasksCount--;
			});

			return result;
		} catch (e) {
			runInAction(() => {
				this.pendingTasksCount--;
			});
		}
	}
}
