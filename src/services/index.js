import UserService from "./user-service";
import RaceInfoService from "./race-info-service";
import AuthenticationService from "./authentication-service";
import { cryptoService } from "./crypto-service/crypto-service";
import RacerService from "./racer-service/index";
import TeamService from "./team-service/index";
import FormulaOneOfficialDataService from "./formula-one-official-data-service";

export function createServices(configProvider) {
	const userStoreApiUrl = configProvider.getUserStoreApiUrl();
	const raceInfoStoreApiUrl = configProvider.getRaceStoreApiUrl();
	const localStorageUserKey = configProvider.getLocalStorageUserKey();

	const userService = new UserService({ userStoreApiUrl });
	const raceInfoService = new RaceInfoService({ raceInfoStoreApiUrl });
	const authenticationService = new AuthenticationService({ localStorageUserKey, userService, cryptoService });
	const racerService = new RacerService();
	const teamService = new TeamService();
	const formulaOneOfficialDataService = new FormulaOneOfficialDataService();

	return {
		userService,
		authenticationService,
		raceInfoService,
		racerService,
		teamService,
		formulaOneOfficialDataService,
	};
}
