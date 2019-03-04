const USER_STORE_URL = process.env.REACT_APP_USER_STORE_URL;
const RACE_STORE_URL = process.env.REACT_APP_RACE_STORE_URL;
const LOCAL_STORAGE_USER_KEY = process.env.REACT_APP_LOCAL_STORAGE_USER_KEY;

const configProvider = {
	isProductionMode() {
		return process.env.REACT_APP_STAGE === "PRODUCTION";
	},

	getUserStoreApiUrl() {
		return USER_STORE_URL;
	},

	getRaceStoreApiUrl() {
		return RACE_STORE_URL;
	},

	getLocalStorageUserKey() {
		return LOCAL_STORAGE_USER_KEY;
	},

	getTickInterval() {
		return process.env.REACT_APP_TICK_INTERVAL;
	},

	getCurrentSeason() {
		return process.env.REACT_APP_CURRENT_SEASON || "2019";
	},

	getVoteClosingTime() {
		return parseInt(process.env.REACT_APP_VOTE_CLOSING_TIME, 10);
	},
};

export default configProvider;
