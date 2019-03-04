import { action, computed, observable, runInAction } from "mobx";

export default class OperationManager {
	@observable pendingTasksCount = 0;

	@computed
	get hasPendingTasks() {
		return this.pendingTasksCount > 0;
	}

	@action
	runWithProgress(fn) {
		this.pendingTasksCount++;
		fn();
		this.pendingTasksCount--;
	}

	@action
	async runWithProgressAsync(fn) {
		this.pendingTasksCount++;

		try {
			return await fn();
		} finally {
			runInAction(() => {
				this.pendingTasksCount--;
			});
		}
	}
}
