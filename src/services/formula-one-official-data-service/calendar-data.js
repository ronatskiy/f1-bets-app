/**
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

export default [
	new RoundSchedule({
		round: 1,
		practice_1: "20180323T010000Z",
		practice_2: "20180323T050000Z",
		practice_3: "20180324T030000Z",
		qualification: "20180324T060000Z",
		race: "20180325T051000Z",
	}),
	new RoundSchedule({
		round: 2,
		practice_1: "20180406T110000Z",
		practice_2: "20180406T150000Z",
		practice_3: "20180407T120000Z",
		qualification: "20180407T150000Z",
		race: "20180408T151000Z",
	}),
	new RoundSchedule({
		round: 3,
		practice_1: "20180413T020000Z",
		practice_2: "20180413T060000Z",
		practice_3: "20180414T030000Z",
		qualification: "20180414T060000Z",
		race: "20180415T061000Z",
	}),
	new RoundSchedule({
		round: 4,
		practice_1: "20180427T090000Z",
		practice_2: "20180427T130000Z",
		practice_3: "20180428T100000Z",
		qualification: "20180428T130000Z",
		race: "20180429T121000Z",
	}),
	new RoundSchedule({
		round: 5,
		practice_1: "20180511T090000Z",
		practice_2: "20180511T130000Z",
		practice_3: "20180512T100000Z",
		qualification: "20180512T130000Z",
		race: "20180513T131000Z",
	}),
	new RoundSchedule({
		round: 6,
		practice_1: "20180524T090000Z",
		practice_2: "20180524T130000Z",
		practice_3: "20180526T100000Z",
		qualification: "20180526T130000Z",
		race: "20180527T131000Z",
	}),
	new RoundSchedule({
		round: 7,
		practice_1: "20180608T140000Z",
		practice_2: "20180608T180000Z",
		practice_3: "20180609T150000Z",
		qualification: "20180609T180000Z",
		race: "20180610T181000Z",
	}),
	new RoundSchedule({
		round: 8,
		practice_1: "20180622T100000Z",
		practice_2: "20180622T140000Z",
		practice_3: "20180623T110000Z",
		qualification: "20180623T140000Z",
		race: "20180624T141000Z",
	}),
	new RoundSchedule({
		round: 9,
		practice_1: "20180629T090000Z",
		practice_2: "20180629T130000Z",
		practice_3: "20180630T100000Z",
		qualification: "20180630T130000Z",
		race: "20180701T131000Z",
	}),
	new RoundSchedule({
		round: 10,
		practice_1: "20180706T090000Z",
		practice_2: "20180706T130000Z",
		practice_3: "20180707T100000Z",
		qualification: "20180707T130000Z",
		race: "20180708T131000Z",
	}),
	new RoundSchedule({
		round: 11,
		practice_1: "20180720T090000Z",
		practice_2: "20180720T130000Z",
		practice_3: "20180721T100000Z",
		qualification: "20180721T130000Z",
		race: "20180722T131000Z",
	}),
	new RoundSchedule({
		round: 12,
		practice_1: "20180727T090000Z",
		practice_2: "20180727T130000Z",
		practice_3: "20180728T100000Z",
		qualification: "20180728T130000Z",
		race: "20180729T131000Z",
	}),
	new RoundSchedule({
		round: 13,
		practice_1: "20180824T090000Z",
		practice_2: "20180824T130000Z",
		practice_3: "20180825T100000Z",
		qualification: "20180825T130000Z",
		race: "20180826T131000Z",
	}),
	new RoundSchedule({
		round: 14,
		practice_1: "20180831T090000Z",
		practice_2: "20180831T130000Z",
		practice_3: "20180901T100000Z",
		qualification: "20180901T130000Z",
		race: "20180902T131000Z",
	}),
	new RoundSchedule({
		round: 15,
		practice_1: "20180914T083000Z",
		practice_2: "20180914T123000Z",
		practice_3: "20180915T100000Z",
		qualification: "20180915T130000Z",
		race: "20180916T121000Z",
	}),
	new RoundSchedule({
		round: 16,
		practice_1: "20180928T080000Z",
		practice_2: "20180928T120000Z",
		practice_3: "20180929T090000Z",
		qualification: "20180929T120000Z",
		race: "20180930T111000Z",
	}),
	new RoundSchedule({
		round: 17,
		practice_1: "20181005T010000Z",
		practice_2: "20181005T050000Z",
		practice_3: "20181006T030000Z",
		qualification: "20181006T060000Z",
		race: "20181007T051000Z",
	}),
	new RoundSchedule({
		round: 18,
		practice_1: "20181019T150000Z",
		practice_2: "20181019T190000Z",
		practice_3: "20181020T180000Z",
		qualification: "20181020T210000Z",
		race: "20181021T181000Z",
	}),
	new RoundSchedule({
		round: 19,
		practice_1: "20181026T150000Z",
		practice_2: "20181026T190000Z",
		practice_3: "20181027T150000Z",
		qualification: "20181027T180000Z",
		race: "20181028T191000Z",
	}),
	new RoundSchedule({
		round: 20,
		practice_1: "20181109T140000Z",
		practice_2: "20181109T180000Z",
		practice_3: "20181110T150000Z",
		qualification: "20181110T180000Z",
		race: "20181111T181000Z",
	}),
	new RoundSchedule({
		round: 21,
		practice_1: "20181123T090000Z",
		practice_2: "20181123T130000Z",
		practice_3: "20181124T100000Z",
		qualification: "20181124T130000Z",
		race: "20181125T131000Z",
	}),
];
