import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

import PrimaryButton from "../../../components/common/primary-button";
import { pathNames } from "../../../routes/routes";

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
			this.props.history.push(pathNames.BETS);
		} else {
			this.props.history.push(pathNames.RESULTS);
		}
	};

	render() {
		const { isBetsAllowed, isUserAlreadyBet, isAuthenticated } = this.props;
		let text = "Подробнее";

		if (isBetsAllowed) {
			if (isAuthenticated) {
				if (!isUserAlreadyBet) {
					text = "Сделать прогноз";
				} else {
					text = "Изменить прогноз";
				}
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
