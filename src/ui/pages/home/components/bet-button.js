import React from "react";
import PropTypes from "prop-types";

import { computed } from "mobx";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

import PrimaryButton from "../../../components/common/primary-button";
import { URL_ROUTES } from "../../../routes/url-routes";
import { BET_BUTTON_CHANGE_VOTE_TEXT, BET_BUTTON_VOTE_TEXT } from "../../../constants/texts";

@withRouter
@inject(stores => ({
	isBetsAllowed: stores.homePageStore.isBetsAllowed,
	isUserAlreadyBet: stores.homePageStore.isUserAlreadyBet,
	isAuthenticated: stores.homePageStore.isAuthenticated,
	nextRaceRoundId: stores.homePageStore.nextWeekend.roundId,
}))
@observer
class BetButton extends React.Component {
	static propTypes = {
		isBetsAllowed: PropTypes.bool.isRequired,
		isUserAlreadyBet: PropTypes.bool.isRequired,
		isAuthenticated: PropTypes.bool.isRequired,
		nextRaceRoundId: PropTypes.string.isRequired,
		roundId: PropTypes.string.isRequired,
	};

	@computed
	get _canBet() {
		const { isBetsAllowed, roundId, nextRaceRoundId } = this.props;

		return isBetsAllowed && nextRaceRoundId === roundId;
	}

	_handleBetButtonClick = () => {
		this.props.history.push(this._canBet ? URL_ROUTES.BETS : URL_ROUTES.RESULTS);
	};

	render() {
		const { isBetsAllowed, isUserAlreadyBet, isAuthenticated, roundId, nextRaceRoundId } = this.props;
		let text = "Таблица прогнозов";

		if (roundId === nextRaceRoundId) {
			if (isBetsAllowed) {
				if (isAuthenticated) {
					text = !isUserAlreadyBet ? BET_BUTTON_VOTE_TEXT : BET_BUTTON_CHANGE_VOTE_TEXT;
				} else {
					text = "Войти для голосования";
				}
			} else {
				text = "К списку прогнозов";
			}
		}

		return <PrimaryButton onClick={this._handleBetButtonClick}>{text}</PrimaryButton>;
	}
}

export default BetButton;
