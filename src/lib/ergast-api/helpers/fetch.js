import axios from "axios";

/**
 * @param {string} url
 * @return {Promise<*>} MRData
 */
export async function fetch(url) {
	try {
		return (await axios.get(url)).data.MRData;
	} catch (e) {
		console.error(e.message);
	}
}

/**
 * @param {string} url
 * @return {Promise<*>} MRData
 */
export async function fetchAll(url) {
	try {
		const total = (await fetch(`${url}?limit=0`)).total;

		return fetch(`${url}?limit=${total}`);
	} catch (e) {
		console.error(e.message);
	}
}
