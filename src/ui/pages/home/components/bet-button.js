import React from "react";
import PropTypes from "prop-types";
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
}))
@observer
class BetButton extends React.Component {
	static propTypes = {
		isBetsAllowed: PropTypes.bool.isRequired,
		isUserAlreadyBet: PropTypes.bool.isRequired,
		isAuthenticated: PropTypes.bool.isRequired,
	};

	handleBetButtonClick = () => {
		const { isBetsAllowed } = this.props;

		if (isBetsAllowed) {
			this.props.history.push(URL_ROUTES.BETS);
		} else {
			this.props.history.push(URL_ROUTES.RESULTS);
		}
	};

	render() {
		const { isBetsAllowed, isUserAlreadyBet, isAuthenticated } = this.props;
		let text = "Таблица прогнозов";

		if (isBetsAllowed) {
			if (isAuthenticated) {
				text = !isUserAlreadyBet ? BET_BUTTON_VOTE_TEXT : BET_BUTTON_CHANGE_VOTE_TEXT;
			} else {
				text = "Войти для голосования";
			}
		} else {
			text = "К списку прогнозов";
		}

		return <PrimaryButton onClick={this.handleBetButtonClick}>{text}</PrimaryButton>;
	}
}

export default BetButton;
