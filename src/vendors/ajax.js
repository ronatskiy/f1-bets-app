import axios from "axios";

function getRequestConfig() {
	return {
		headers: { "secret-key": "$2b$10$nd.f9pwc.J84FZnU63N9au/jjAqVcF8VgyVWqJgJ.PIbUrwRnYVFG", versioning: false },
	};
}

export const ajax = {
	async get(url) {
		try {
			return (await axios.get(url, getRequestConfig())).data;
		} catch (e) {
			console.error(e.message);
		}
	},

	async put(url, data) {
		try {
			return axios.put(url, data, getRequestConfig());
		} catch (e) {
			console.error(e.message);
		}
	},
};
