import axios from "axios";

export const ajax = {
	async get(url) {
		try {
			return (await axios.get(url)).data;
		} catch (e) {
			console.error(e.message);
		}
	},

	async put(url, data) {
		try {
			return axios.put(url, data);
		} catch (e) {
			console.error(e.message);
		}
	},
};
