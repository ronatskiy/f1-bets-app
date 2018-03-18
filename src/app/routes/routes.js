import Home from "../pages/home";
import Bets from "../pages/bets";
import Results from "../pages/results";
import RacersList from "../pages/racers-list";
import TeamsList from "../pages/teams";
import AdminPage from "../pages/admin/admin";
import LoginPage from "../pages/login/login";
import CalendarPage from "../pages/calendar/calendar";
import generateId from "../../storage/generate-id";
import SignOutPage from "../pages/sign-out/sign-out";
import BetsHistory from "../pages/bets-history";

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
	SIGN_OUT: "/sign-out",
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
		path: pathNames.SIGN_OUT,
		component: SignOutPage,
		id: generateId(),
	},
];

export default AppRoutesConfig;
