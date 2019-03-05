import calcScore, { calculateScore } from "../calc-score";
import UserBetsResult from "../../user-bets-result";
import BetInfo from "../../../../../../domain/bet-info";
import UserInfo from "../../../../../../domain/user-info";
import BetScore from "../../bet-score";

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
			_score: [10, 10, 10, 2, 0, 10, 0, 0, 0, 2],
		});
	});
});

describe("calculateScore", () => {
	const createScore = array => {
		const score = new BetScore();
		score._score = [...array];
		return score;
	};
	const officialResults = [
		"HAM",
		"RAI",
		"PER",
		"VET",
		"SAI",
		"LEC",
		"ALO",
		"STR",
		"VAN",
		"HAR",
		"ERI",
		"GAS",
		"MAG",
		"BOT",
		"GRO",
		"VER",
		"RIC",
		"HUL",
		"OCO",
		"SIR",
	];

	it("should correctly calculate a bet score", () => {
		const userPrediction = ["HAM", "PER", "SAI", "RIC", "VET", "", "ALO", "HUL", "LEC", "RAI"];
		const expectedScore = createScore([10, 8, 6, 0, 8, 0, 10, 0, 4, 2]);

		const score = calculateScore(userPrediction, officialResults);

		expect(score).toEqual(expectedScore);
	});
});
