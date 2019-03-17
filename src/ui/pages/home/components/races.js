import React from "react";
import RaceInfoPanel from "./race-info-panel/race-info-panel";

import { ALREADY_BET_MESSAGE } from "../../../constants/texts";

export function Races({ races }) {
	return races.map(race => (
		<section key={race.roundId} className="section race-info-wrapper">
			<RaceInfoPanel raceInfo={race} infoText={ALREADY_BET_MESSAGE} />
		</section>
	));
}
