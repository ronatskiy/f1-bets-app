import React from "react";
import PropTypes from "prop-types";
import PrevSeasonViewer from "../../../components/prev-season-viewer";
import { Races } from "./races";
import SeasonViewModel from "../models/season-model";

function Season({ season: seasonModel, onLoadSeasonData }) {
	const { season, isLoaded, weekends } = seasonModel;
	const seasonTitle = `История сезона ${season}`;
	const handleLoadSeasonData = () => {
		onLoadSeasonData(season);
	};

	return (
		<PrevSeasonViewer
			key={season}
			season={season}
			isSeasonLoaded={isLoaded}
			seasonTitle={seasonTitle}
			loadSeasonButtonCaption={`Загрузить историю сезона ${season}`}
			onLoadSeason={handleLoadSeasonData}
		>
			<Races races={weekends} />
		</PrevSeasonViewer>
	);
}

Season.propTypes = {
	season: PropTypes.instanceOf(SeasonViewModel).isRequired,
	onLoadSeasonData: PropTypes.func.isRequired,
};

export default Season;
