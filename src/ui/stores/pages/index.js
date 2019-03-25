import HomePageStore from "../../pages/home/stores/home";
import AdminPageStore from "../../pages/admin/stores/admin-page-store";
import BetPageStore from "../../pages/bets/bet-page-store";
import UserBetsHistoryPageStore from "../../pages/bets-history/stores/user-bets-history";
import CalendarPageStore from "../../pages/calendar/stores/calendar-page-store";
import LoginPageStore from "../../pages/login/login-page-store";
import LogoutPageStore from "../../pages/logout/logout-page-store";
import RacerStandingsStore from "../../pages/racers-list/stores/racer-standings-store";
import ResultsPageStore from "../../pages/results/stores/results-page-store";
import TeamsStandingsStore from "../../pages/teams/stores/teams-standings-store";
import ProfilePageStore from "../../pages/profile/stores/profile-page-store";

export function createPagesStores(appModel) {
	const homePageStore = new HomePageStore(appModel);
	const resultsPageStore = new ResultsPageStore(appModel);
	const racerStandingsPageStore = new RacerStandingsStore(appModel);
	const teamsStandingsPageStore = new TeamsStandingsStore(appModel);
	const adminPageStore = new AdminPageStore(appModel, appModel.services.racesInfoService);
	const loginPageStore = new LoginPageStore(appModel);
	const logoutPageStore = new LogoutPageStore(appModel);
	const calendarPageStore = new CalendarPageStore(appModel);
	const userBetsHistoryPageStore = new UserBetsHistoryPageStore(appModel);
	const betPageStore = new BetPageStore(appModel);
	const profilePageStore = new ProfilePageStore(appModel);

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
		profilePageStore,
	};
}
