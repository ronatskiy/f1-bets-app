import { calcPointsForGuessedBet } from "../calc-points-for-guessed-bet";

describe("calcPointsForGuessedBet", () => {
	it("calcPointsForGuessedBet(1, 1) => 25", () => {
		const result = calcPointsForGuessedBet(1, 1);
		expect(result).toBe(25);
	});

	it("calcPointsForGuessedBet(2, 2) => 18", () => {
		const result = calcPointsForGuessedBet(2, 2);
		expect(result).toBe(18);
	});

	it("calcPointsForGuessedBet(3, 3) => 15", () => {
		const result = calcPointsForGuessedBet(3, 3);
		expect(result).toBe(15);
	});

	it("calcPointsForGuessedBet(4, 4) => 10", () => {
		const result = calcPointsForGuessedBet(4, 4);
		expect(result).toBe(10);
	});

	it("calcPointsForGuessedBet(4, 10) => 2", () => {
		const result = calcPointsForGuessedBet(4, 10);
		expect(result).toBe(2);
	});
});
