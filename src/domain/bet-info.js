function toJS(betsMap) {
	if (betsMap instanceof Map) {
		const js = {};
		for (let [pos, racer] of betsMap) {
			if (racer) {
				js[pos] = racer;
			}
		}
		return js;
	}
	return betsMap;
}

class BetInfo {
	/**
	 * @param {UserInfo} userInfo
	 * @param {Object} betsMap
	 * @param {string} betsMap.1
	 * @param {string} betsMap.2
	 * @param {string} betsMap.3
	 * @param {string} betsMap.4
	 * @param {string} betsMap.5
	 * @param {string} betsMap.6
	 * @param {string} betsMap.7
	 * @param {string} betsMap.8
	 * @param {string} betsMap.9
	 * @param {string} betsMap.10
	 */
	constructor({ userInfo, betsMap }) {
		this.userInfo = userInfo;
		this.betsMap = toJS(betsMap);
	}
}

export default BetInfo;
