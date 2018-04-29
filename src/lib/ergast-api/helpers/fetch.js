import axios from "axios";

/**
 * @param {string} url
 * @return {Promise<*>} MRData
 */
export async function fetch(url) {
	return (await axios.get(url)).data.MRData;
}

/**
 * @param {string} url
 * @return {Promise<*>} MRData
 */
export async function fetchAll(url) {
	const total = await fetch(`${url}?limit=0`).total;

	return fetch(`${url}?limit=${total}`);
}
