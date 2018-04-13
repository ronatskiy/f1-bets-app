import React from "react";
import PropTypes from "prop-types";
import { Jumbotron } from "reactstrap";

import BetButton from "./bet-button";
import Race from "../../../domain/race";

class NextRaceIntro extends React.Component {
	static propTypes = {
		nextRace: PropTypes.instanceOf(Race),
		onBetButtonClick: PropTypes.func.isRequired,
	};

	render() {
		const { nextRace, isBetsAllowed, onBetButtonClick } = this.props;

		return (
			<Jumbotron>
				<h1 className="display-4">{nextRace.location} уже скоро!</h1>
				<p className="lead">
					{isBetsAllowed
						? `Сейчас принимаются прогнозы на ${nextRace.prettyTitle}`
						: `Сейчас прогнозы на ${
								nextRace.prettyTitle
						  } уже не принимаются. Спасибо всем кто принял участие`}.
				</p>
				<p>
					Напоминаем, что Вы можете делать свой прогноз лишь до начала субботней квалификации. Новая
					возможность оставить свой прогноз, на будущую гонку, у Вас появится после начала этой.
				</p>
				<p className="lead">
					<BetButton onClick={onBetButtonClick} />
				</p>
			</Jumbotron>
		);
	}
}

export default NextRaceIntro;
