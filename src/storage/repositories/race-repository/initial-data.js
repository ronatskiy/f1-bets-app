import Race from "../../types/race";
import { generateRaceId } from "../../generate-id";

export default [
	new Race({
		id: generateRaceId(),
		title: "AUSTRALIAN GRAND PRIX 2018",
		officialData: {
			location: "Melbourne",
			qualifying: {
				start: "20180324T060000Z",
			},
			race: {
				start: "20180325T051000Z",
			},
		},
		bets: [
			{
				userInfo: { name: "John Doe", id: "jepvk5gn-26bf-11e8-jepvk6gn" },
				betsMap: {
					"1": "HEM",
					"2": "VET",
					"8": "GRO",
				},
			},
		],
	}),
	new Race({
		id: generateRaceId(),
		title: "BAHRAIN GRAND PRIX 2018",
		officialData: {
			location: "Sakhir",
			qualifying: {
				start: "20180407T150000Z",
			},
			race: {
				start: "20180408T151000Z",
			},
		},
	}),
	new Race({
		title: "CHINESE GRAND PRIX 2018",
		officialData: {
			location: "Shanghai",
			qualifying: {
				start: "20180414T060000Z",
			},
			race: {
				start: "20180415T061000Z",
			},
		},
	}),
	new Race({
		title: "AZERBAIJAN GRAND PRIX 2018",
		officialData: {
			location: "Baku",
			qualifying: {
				start: "20180428T130000Z",
			},
			race: {
				start: "20180429T121000Z",
			},
		},
	}),
	new Race({
		title: "SPANISH GRAND PRIX 2018",
		officialData: {
			location: "Catalunya",
			qualifying: {
				start: "20180512T130000Z",
			},
			race: {
				start: "20180513T131000Z",
			},
		},
	}),
	new Race({
		title: "MONACO GRAND PRIX 2018",
		officialData: {
			location: "Monte Carlo",
			qualifying: {
				start: "20180526T130000Z",
			},
			race: {
				start: "20180527T131000Z",
			},
		},
	}),
	new Race({
		title: "CANADIAN GRAND PRIX 2018",
		officialData: {
			location: "Montreal",
			qualifying: {
				start: "20180609T180000Z",
			},
			race: {
				start: "20180610T181000Z",
			},
		},
	}),
	new Race({
		title: "FRENCH GRAND PRIX 2018",
		officialData: {
			location: "Paul Ricard",
			qualifying: {
				start: "20180623T140000Z",
			},
			race: {
				start: "20180624T141000Z",
			},
		},
	}),
	new Race({
		title: "AUSTRIAN GRAND PRIX 2018",
		officialData: {
			location: "Spielberg",
			qualifying: {
				start: "20180630T130000Z",
			},
			race: {
				start: "20180701T131000Z",
			},
		},
	}),
	new Race({
		title: "BRITISH GRAND PRIX 2018",
		officialData: {
			location: "Silverstone",
			qualifying: {
				start: "20180707T130000Z",
			},
			race: {
				start: "20180708T131000Z",
			},
		},
	}),
	new Race({
		title: "GERMAN GRAND PRIX 2018",
		officialData: {
			location: "Hockenheim",
			qualifying: {
				start: "20180721T130000Z",
			},
			race: {
				start: "20180722T131000Z",
			},
		},
	}),
	new Race({
		title: "HUNGARIAN GRAND PRIX 2018",
		officialData: {
			location: "Budapest",
			qualifying: {
				start: "20180728T130000Z",
			},
			race: {
				start: "20180729T131000Z",
			},
		},
	}),
	new Race({
		title: "BELGIAN GRAND PRIX 2018",
		officialData: {
			location: "Spa-Francorchamps",
			qualifying: {
				start: "20180825T130000Z",
			},
			race: {
				start: "20180826T131000Z",
			},
		},
	}),
	new Race({
		title: "ITALIAN GRAND PRIX 2018",
		officialData: {
			location: "Monza",
			qualifying: {
				start: "20180901T130000Z",
			},
			race: {
				start: "20180902T131000Z",
			},
		},
	}),
	new Race({
		title: "SINGAPORE GRAND PRIX 2018",
		officialData: {
			location: "Singapore",
			qualifying: {
				start: "20180915T130000Z",
			},
			race: {
				start: "20180916T121000Z",
			},
		},
	}),
	new Race({
		title: "RUSSIAN GRAND PRIX 2018",
		officialData: {
			location: "Sochi",
			qualifying: {
				start: "20180929T120000Z",
			},
			race: {
				start: "20180930T111000Z",
			},
		},
	}),
	new Race({
		title: "JAPANESE GRAND PRIX 2018",
		officialData: {
			location: "Suzuka",
			qualifying: {
				start: "20181006T060000Z",
			},
			race: {
				start: "20181007T051000Z",
			},
		},
	}),
	new Race({
		title: "UNITED STATES GRAND PRIX 2018",
		officialData: {
			location: "Austin",
			qualifying: {
				start: "20181020T210000Z",
			},
			race: {
				start: "20181021T181000Z",
			},
		},
	}),
	new Race({
		title: "MEXICAN GRAND PRIX 2018",
		officialData: {
			location: "Mexico City",
			qualifying: {
				start: "20181027T180000Z",
			},
			race: {
				start: "20181028T191000Z",
			},
		},
	}),
	new Race({
		title: "BRAZILIAN GRAND PRIX 2018",
		officialData: {
			location: "Sao Paulo",
			qualifying: {
				start: "20181110T180000Z",
			},
			race: {
				start: "20181111T181000Z",
			},
		},
	}),
	new Race({
		title: "ABU DHABI GRAND PRIX 2018",
		officialData: {
			location: "Yas Marina",
			qualifying: {
				start: "20181124T130000Z",
			},
			race: {
				start: "20181125T131000Z",
			},
		},
	}),
];
