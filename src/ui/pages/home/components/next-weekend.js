import React from "react";
import RaceInfoPanel from "./race-info-panel/race-info-panel";
import BetButton from "./bet-button";
import { ALREADY_BET_MESSAGE } from "../../../constants/texts";

export default function NextWeekend({ weekend, isBetsAllowed }) {
	return (
		<section className="section colors--very-light-red">
			<RaceInfoPanel
				raceInfo={weekend}
				commandButton={BetButton}
				infoText={
					isBetsAllowed
						? "Спешите проголосовать пока прогнозы на этот этап еще принимаются."
						: ALREADY_BET_MESSAGE
				}
			/>
		</section>
	);
}
