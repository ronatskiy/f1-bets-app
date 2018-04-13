import Home from "../pages/home";
import Bets from "../pages/bets";
import Results from "../pages/results";
import RacersList from "../pages/racers-list";
import TeamsList from "../pages/teams";
import AdminPage from "../pages/admin/admin";
import LoginPage from "../pages/login/login";
import CalendarPage from "../pages/calendar/calendar";
import LogoutPage from "../pages/logout/logout-page";
import BetsHistory from "../pages/bets-history";
import generateId from "../services/crypto-service/generate-id";

export { default as Route } from "./smart-route";

export const pathNames = {
	HOME: "/",
	CALENDAR: "/calendar",
	BETS: "/bets",
	ADMIN: "/admin",
	RESULTS: "/results",
	RACERS: "/racers",
	TEAMS: "/teams",
	LOGIN: "/login",
	LOGOUT: "/logout",
	BETS_HISTORY: "/bets-history",
};

const AppRoutesConfig = [
	{
		exact: true,
		path: pathNames.HOME,
		component: Home,
		id: generateId(),
	},
	{
		isPrivate: true,
		path: pathNames.BETS,
		component: Bets,
		id: generateId(),
	},
	{
		isPrivate: true,
		path: pathNames.BETS_HISTORY,
		component: BetsHistory,
		id: generateId(),
	},
	{
		path: pathNames.RESULTS,
		component: Results,
		id: generateId(),
	},
	{
		path: pathNames.RACERS,
		component: RacersList,
		id: generateId(),
	},
	{
		path: pathNames.TEAMS,
		component: TeamsList,
		id: generateId(),
	},
	{
		path: pathNames.LOGIN,
		component: LoginPage,
		id: generateId(),
	},
	{
		isPrivate: true,
		onlyForAdmins: true,
		path: pathNames.ADMIN,
		component: AdminPage,
		id: generateId(),
	},
	{
		path: pathNames.CALENDAR,
		component: CalendarPage,
		id: generateId(),
	},
	{
		path: pathNames.LOGOUT,
		component: LogoutPage,
		id: generateId(),
	},
];

export default AppRoutesConfig;
