import { observable, action, runInAction, computed } from "mobx";

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
