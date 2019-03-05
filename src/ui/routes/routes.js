import React, { Suspense } from "react";
import generateId from "../../services/crypto-service/generate-id";

import Home from "../../pages/home";
import LoginPage from "../../pages/login/login";
import LogoutPage from "../../pages/logout/logout-page";
const Bets = React.lazy(() => import("../../pages/bets"));
const Results = React.lazy(() => import("../../pages/results"));
const TeamsList = React.lazy(() => import("../../pages/teams"));
const AdminPage = React.lazy(() => import("../../pages/admin/admin"));
const RacersList = React.lazy(() => import("../../pages/racers-list"));
const CalendarPage = React.lazy(() => import("../../pages/calendar/calendar"));
const BetsHistory = React.lazy(() => import("../../pages/bets-history"));

export { default as Route } from "./smart-route";

export const pathNames = {
	HOME: "/",
	CALENDAR: "/calendar",
	BETS: "/bet",
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
		path: pathNames.LOGIN,
		component: LoginPage,
		id: generateId(),
	},
	{
		path: pathNames.LOGOUT,
		component: LogoutPage,
		id: generateId(),
	},
	{
		isPrivate: true,
		path: pathNames.BETS,
		component: () => (
			<Suspense fallback={<div />}>
				<Bets />
			</Suspense>
		),
		id: generateId(),
	},
	{
		isPrivate: true,
		path: pathNames.BETS_HISTORY,
		component: () => (
			<Suspense fallback={<div />}>
				<BetsHistory />
			</Suspense>
		),
		id: generateId(),
	},
	{
		path: pathNames.RESULTS,
		component: () => (
			<Suspense fallback={<div />}>
				<Results />
			</Suspense>
		),
		id: generateId(),
	},
	{
		path: pathNames.RACERS,
		component: () => (
			<Suspense fallback={<div />}>
				<RacersList />
			</Suspense>
		),
		id: generateId(),
	},
	{
		path: pathNames.TEAMS,
		component: () => (
			<Suspense fallback={<div />}>
				<TeamsList />
			</Suspense>
		),
		id: generateId(),
	},
	{
		path: pathNames.CALENDAR,
		component: () => (
			<Suspense fallback={<div />}>
				<CalendarPage />
			</Suspense>
		),
		id: generateId(),
	},
	{
		isPrivate: true,
		onlyForAdmins: true,
		path: pathNames.ADMIN,
		component: () => (
			<Suspense fallback={<div />}>
				<AdminPage />
			</Suspense>
		),
		id: generateId(),
	},
];

export default AppRoutesConfig;
