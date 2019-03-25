import React, { Suspense } from "react";
import generateId from "../../services/crypto-service/generate-id";

import Home from "../pages/home";
import LoginPage from "../pages/login/login";
import LogoutPage from "../pages/logout/logout-page";
import { URL_ROUTES } from "./url-routes";

const Bets = React.lazy(() => import("../pages/bets/bet-page"));
const Results = React.lazy(() => import("../pages/results"));
const TeamsList = React.lazy(() => import("../pages/teams"));
const AdminPage = React.lazy(() => import("../pages/admin/admin"));
const RacersList = React.lazy(() => import("../pages/racers-list"));
const CalendarPage = React.lazy(() => import("../pages/calendar/index"));
const BetsHistory = React.lazy(() => import("../pages/bets-history"));
const ProfilePage = React.lazy(() => import("../pages/profile/profile-page"));

export { default as Route } from "./smart-route";

const AppRoutesConfig = [
	{
		exact: true,
		path: URL_ROUTES.HOME,
		component: Home,
		id: generateId(),
	},
	{
		path: URL_ROUTES.LOGIN,
		component: LoginPage,
		id: generateId(),
	},
	{
		path: URL_ROUTES.LOGOUT,
		component: LogoutPage,
		id: generateId(),
	},
	{
		isPrivate: true,
		path: URL_ROUTES.BETS,
		component: () => (
			<Suspense fallback={<div />}>
				<Bets />
			</Suspense>
		),
		id: generateId(),
	},
	{
		isPrivate: true,
		path: URL_ROUTES.BETS_HISTORY,
		component: () => (
			<Suspense fallback={<div />}>
				<BetsHistory />
			</Suspense>
		),
		id: generateId(),
	},
	{
		path: URL_ROUTES.RESULTS,
		component: () => (
			<Suspense fallback={<div />}>
				<Results />
			</Suspense>
		),
		id: generateId(),
	},
	{
		path: URL_ROUTES.RACERS,
		component: () => (
			<Suspense fallback={<div />}>
				<RacersList />
			</Suspense>
		),
		id: generateId(),
	},
	{
		path: URL_ROUTES.TEAMS,
		component: () => (
			<Suspense fallback={<div />}>
				<TeamsList />
			</Suspense>
		),
		id: generateId(),
	},
	{
		path: URL_ROUTES.CALENDAR,
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
		path: URL_ROUTES.ADMIN,
		component: () => (
			<Suspense fallback={<div />}>
				<AdminPage />
			</Suspense>
		),
		id: generateId(),
	},
	{
		isPrivate: true,
		path: URL_ROUTES.PROFILE,
		component: () => (
			<Suspense fallback={<div />}>
				<ProfilePage />
			</Suspense>
		),
		id: generateId(),
	},
];

export default AppRoutesConfig;
