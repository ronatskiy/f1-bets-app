import { inject } from "mobx-react";

import HomePage from "./components/home-page";
import "./index.css";

export default inject(({ homePageStore }) => {
	const { nextWeekend, isBetsAllowed, currentSeason, currentSeasonRacesCount, seasons } = homePageStore;

	return {
		nextWeekend,
		isBetsAllowed,
		currentSeason,
		seasons,
		currentSeasonRacesCount,
		onLoadHistory: season => homePageStore.loadSeasonHistory(season),
	};
})(HomePage);
