/**
 * @name RoundSchedule
 * @property {number} round
 * @property {string} practice_1
 * @property {string} practice_2
 * @property {string} practice_3
 * @property {string} qualification
 * @property {string} race
 */
export class RoundSchedule {
	/**
	 * @param {number} round
	 * @param {string} practice_1
	 * @param {string} practice_2
	 * @param {string} practice_3
	 * @param {string} qualification
	 * @param {string} race
	 */
	constructor({ round, practice_1, practice_2, practice_3, qualification, race }) {
		this.round = round;
		this.practice_1 = practice_1;
		this.practice_2 = practice_2;
		this.practice_3 = practice_3;
		this.qualification = qualification;
		this.race = race;
	}
}
