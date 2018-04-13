import Team from "../../domain/team";
import { RacerId, RACERS_MAP } from "../racer-service/data";

export const Teams2018 = [
	new Team("Mercedes", "Mercedes", [RACERS_MAP.get(RacerId.HAM), RACERS_MAP.get(RacerId.BOT)]),
	new Team("Ferrari", "Ferrari", [RACERS_MAP.get(RacerId.VET), RACERS_MAP.get(RacerId.RAI)]),
	new Team("Red Bull", "TAG Heuer", [RACERS_MAP.get(RacerId.VER), RACERS_MAP.get(RacerId.RIC)]),
	new Team("Force India", "Mercedes", [RACERS_MAP.get(RacerId.PER), RACERS_MAP.get(RacerId.OCO)]),
	new Team("Williams", "Mercedes", [RACERS_MAP.get(RacerId.STR), RACERS_MAP.get(RacerId.SIR)]),
	new Team("Renault", "Renault", [RACERS_MAP.get(RacerId.HUL), RACERS_MAP.get(RacerId.SAI)]),
	new Team("Toro Rosso", "Honda", [RACERS_MAP.get(RacerId.GAS), RACERS_MAP.get(RacerId.HAR)]),
	new Team("Haas", "Ferrari", [RACERS_MAP.get(RacerId.GRO), RACERS_MAP.get(RacerId.MAG)]),
	new Team("McLaren", "Renault", [RACERS_MAP.get(RacerId.ALO), RACERS_MAP.get(RacerId.VAN)]),
	new Team("Sauber", "Ferrari", [RACERS_MAP.get(RacerId.ERI), RACERS_MAP.get(RacerId.LEC)]),
];
