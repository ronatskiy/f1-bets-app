import HomePageStore from "../../pages/home/stores/home";
import RacerStandingsStore from "../../pages/racers-list/stores/racer-standings-store";
import TeamsStandingsStore from "../../pages/teams/stores/teams-standings-store";
import AdminPageStore from "../../pages/admin/stores/admin-page-store";
import LoginPageStore from "./login";
import LogoutPageStore from "./logout";
import ResultsPageStore from "../../pages/results/stores/results-page-store";
import CalendarPageStore from "../../pages/calendar/stores/calendar-page-store";
import UserBetsHistoryPageStore from "./user-bets-history";
import BetPageStore from "../../pages/bets/store/bet-page-store";

export function createPagesStores(appModel) {
	const homePageStore = new HomePageStore(appModel);
	const resultsPageStore = new ResultsPageStore(appModel);
	const racerStandingsPageStore = new RacerStandingsStore(appModel);
	const teamsStandingsPageStore = new TeamsStandingsStore(appModel);
	const adminPageStore = new AdminPageStore(appModel);
	const loginPageStore = new LoginPageStore(appModel);
	const logoutPageStore = new LogoutPageStore(appModel);
	const calendarPageStore = new CalendarPageStore(appModel);
	const userBetsHistoryPageStore = new UserBetsHistoryPageStore(appModel);
	const betPageStore = new BetPageStore(appModel);

	return {
		homePageStore,
		resultsPageStore,
		racerStandingsPageStore,
		teamsStandingsPageStore,
		adminPageStore,
		loginPageStore,
		logoutPageStore,
		calendarPageStore,
		userBetsHistoryPageStore,
		betPageStore,
	};
}
