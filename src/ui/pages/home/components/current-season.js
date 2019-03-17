import React from "react";
import NextWeekend from "./next-weekend";
import { Races } from "./races";

function CurrentSeason({ seasonModel, nextWeekend, isBetsAllowed, currentSeasonRacesCount }) {
	const { season, weekends: previousWeekends } = seasonModel;

	return (
		<>
			{nextWeekend && <NextWeekend weekend={nextWeekend} isBetsAllowed={isBetsAllowed} />}
			{previousWeekends.length > 0 && previousWeekends.length !== currentSeasonRacesCount && (
				<section className="section text-center">Ранее в сезоне {season}</section>
			)}
			{previousWeekends.length > 0 && <Races races={previousWeekends} />}
		</>
	);
}

export default CurrentSeason;
