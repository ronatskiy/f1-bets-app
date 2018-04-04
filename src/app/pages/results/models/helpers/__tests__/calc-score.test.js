import { calcScore } from "../calc-score";
import UserBetsResult from "../../user-bets-result";
import { BetInfo, UserInfo } from "../../../../../../storage";

const officialResultsMap = new Map([
	[1, "VET"],
	[2, "HAM"],
	[3, "RAI"],
	[4, "RIC"],
	[5, "ALO"],
	[6, "VER"],
	[7, "HUL"],
	[8, "BOT"],
	[9, "VAN"],
	[10, "SAI"],
]);

describe("func calcScore", () => {
	it("should return correct formed BetScore object", () => {
		const result = calcScore(
			new BetInfo({
				userInfo: new UserInfo({ name: "fakeName", id: "fakeId" }),
				betsMap: new Map([[1, "VET"], [2, "HAM"], [3, "RAI"], [6, "VER"], [10, "ALO"]]),
			}),
			UserBetsResult.createOfficialResults(officialResultsMap),
		);
		expect(result).toEqual({
			_score: [25, 18, 15, 0, 0, 10, 0, 0, 0, 2],
		});
	});
});
