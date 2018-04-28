import axios from "axios";

export async function fetchData(url) {
	return (await axios.get(url)).data;
}

export function updateData(url, data) {
	return axios.put(url, data);
}
