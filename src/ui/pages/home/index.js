import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import cn from "classnames";

import { URL_ROUTES } from "../../routes/url-routes";
import Race from "../../../domain/race";
import RaceInfoPanel from "./components/race-info-panel/race-info-panel";
import BetButton from "./components/bet-button";
import PrimaryButton from "../../components/common/primary-button";

const ALREADY_BET_MESSAGE = "Сейчас прогнозы на этот этап уже не принимаются. Спасибо за Ваше участие.";

@inject("homePageStore")
@withRouter
@observer
class HomePage extends Component {
	static propTypes = {
		homePageStore: PropTypes.shape({
			isBetsAllowed: PropTypes.bool.isRequired,
			nextRace: PropTypes.instanceOf(Race),
		}).isRequired,
	};

	handleShowMoreButtonClick = () => {
		this.props.history.push(URL_ROUTES.RESULTS);
	};

	showMoreButton = () => <PrimaryButton onClick={this.handleShowMoreButtonClick}>Таблица прогнозов</PrimaryButton>;

	render() {
		const { nextRaceInfo, previousRaces, isBetsAllowed } = this.props.homePageStore;

		return (
			<div className="home-page">
				<section className="colors--very-light-red section">
					{nextRaceInfo && (
						<RaceInfoPanel
							raceInfo={nextRaceInfo}
							commandButton={BetButton}
							infoText={
								isBetsAllowed
									? "Спешите проголосовать пока прогнозы на этот этап еще принимаются."
									: ALREADY_BET_MESSAGE
							}
						/>
					)}
				</section>
				{previousRaces.length > 0 && <section className="section text-center">Ранее в сериале :)</section>}
				{previousRaces.map((raceInfo, index) => {
					const classNames = cn("section", {
						"colors--very-light-green": index % 2 === 0,
						"colors--light-gray": index % 2 !== 0,
					});

					return (
						<section key={raceInfo.countryName} className={classNames}>
							<RaceInfoPanel
								raceInfo={raceInfo}
								commandButton={this.showMoreButton}
								infoText={ALREADY_BET_MESSAGE}
							/>
						</section>
					);
				})}
			</div>
		);
	}
}

export default HomePage;
