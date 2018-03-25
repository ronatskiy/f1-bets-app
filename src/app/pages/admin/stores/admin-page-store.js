import RaceSectionStore from "./race-section-store";

class AdminPageStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this.raceSectionStore = new RaceSectionStore(rootStore);
	}

	async deleteUser(id) {
		if (window.confirm("Вы точно хотите удалить пользователя?")) {
			await this.rootStore.userStore.deleteUser(id);
		}
	}
}

export default AdminPageStore;
