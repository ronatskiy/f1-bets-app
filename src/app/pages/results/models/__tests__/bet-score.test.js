import BetScore from "../bet-score";

describe("BetScore", () => {
	const score = new BetScore();
	score.add(10);
	score.add(0);
	score.add(15);
	score.add(2);
	score.add(0);

	it("tooltip should return joined string", () => {
		expect(score.tooltip).toBe("10-0-15-2-0");
	});

	it("value should return sum of all points", () => {
		expect(score.value).toBe(27);
	});
});
