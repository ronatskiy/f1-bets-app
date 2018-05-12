import HomePageStore from "../../pages/home/stores/home";
import RacerStandingsStore from "../../pages/racers-list/stores/racer-standings-store";
import TeamsStandingsStore from "../../pages/teams/stores/teams-standings-store";
import AdminPageStore from "../../pages/admin/stores/admin-page-store";
import LoginPageStore from "./login";
import LogoutPageStore from "./logout";
import ResultsPageStore from "../../pages/results/stores/results-page-store";
import CalendarPageStore from "../../pages/calendar/stores/calendar";
import UserBetsHistoryPageStore from "./user-bets-history";
import BetPageStore from "./bet";

export function createPagesStores(appViewModel) {
	const homePageStore = new HomePageStore(appViewModel);
	const resultsPageStore = new ResultsPageStore(appViewModel);
	const racerStandingsPageStore = new RacerStandingsStore(appViewModel);
	const teamsStandingsPageStore = new TeamsStandingsStore(appViewModel);
	const adminPageStore = new AdminPageStore(appViewModel);
	const loginPageStore = new LoginPageStore(appViewModel);
	const logoutPageStore = new LogoutPageStore(appViewModel);
	const calendarPageStore = new CalendarPageStore(appViewModel);
	const userBetsHistoryPageStore = new UserBetsHistoryPageStore(appViewModel);
	const betPageStore = new BetPageStore(appViewModel);

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
