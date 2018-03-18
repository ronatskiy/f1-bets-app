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
	constructor({ userInfo, betsMap }) {
		this.userInfo = userInfo;
		this.betsMap = toJS(betsMap);
	}
}

export default BetInfo;
