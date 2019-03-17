import React from "react";
import PropTypes from "prop-types";

import Season from "./season";
import CurrentSeason from "./current-season";
import WeekendViewModel from "../models/weekend-info-view-model";
import SeasonViewModel from "../models/season-model";

class HomePage extends React.Component {
	static propTypes = {
		nextWeekend: PropTypes.instanceOf(WeekendViewModel),
		isBetsAllowed: PropTypes.bool.isRequired,
		currentSeason: PropTypes.string.isRequired,
		currentSeasonRacesCount: PropTypes.number.isRequired,
		onLoadHistory: PropTypes.func.isRequired,
		seasons: PropTypes.arrayOf(PropTypes.instanceOf(SeasonViewModel)).isRequired,
	};

	render() {
		const {
			isBetsAllowed,
			nextWeekend,
			seasons = [],
			currentSeason,
			currentSeasonRacesCount,
			onLoadHistory,
		} = this.props;

		return (
			<div className="home-page">
				{seasons.map(seasonModel => {
					if (currentSeason === seasonModel.season) {
						return (
							<CurrentSeason
								key={seasonModel.season}
								isBetsAllowed={isBetsAllowed}
								nextWeekend={nextWeekend}
								seasonModel={seasonModel}
								currentSeasonRacesCount={currentSeasonRacesCount}
							/>
						);
					}

					return <Season key={seasonModel.season} season={seasonModel} onLoadSeasonData={onLoadHistory} />;
				})}
			</div>
		);
	}
}

export default HomePage;
