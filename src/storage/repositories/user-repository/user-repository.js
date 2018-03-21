import { USER_STORE_URL } from "../../../config/config";
import { fetchData, updateData } from "../../web-api";
import initialUserData from "./initial-data";
import generateId from "../../generate-id";
import User from "../../types/user";

async function fetchCollection() {
	return (await fetchData(USER_STORE_URL)).map(User.fromJs);
}

function updateCollection(userCollection) {
	return updateData(USER_STORE_URL, userCollection);
}

const UserRepository = {
	DATA_STORE_URL: USER_STORE_URL,

	init() {
		updateCollection(initialUserData);
	},

	getAll() {
		return fetchCollection();
	},

	async getById(id) {
		return (await this.getAll()).find(u => u.id === id);
	},

	async addOrUpdate(user) {
		const users = await this.getAll();
		if (!user.id) {
			user.id = generateId();
			users.push(user);
		} else {
			const userIndex = users.findIndex(({ id }) => id === user.id);
			if (userIndex > -1) {
				users[userIndex] = user;
			} else {
				users.push(user);
			}
		}

		return updateCollection(users);
	},

	async delete(id) {
		if (!id) {
			return;
		}
		const users = await this.getAll();
		return updateCollection(users.filter(user => user.id !== id));
	},
};

export default UserRepository;
