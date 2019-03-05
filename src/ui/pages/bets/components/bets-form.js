import React, { Component } from "react";
import PropTypes from "prop-types";
import { PropTypes as MobxPropTypes } from "mobx-react";
import { withRouter } from "react-router-dom";

import { URL_ROUTES } from "../../../routes/url-routes";
import Racer from "../../../../domain/racer";
import BetInfo from "../../../../domain/bet-info";
import User from "../../../../domain/user";
import GridSelector from "../../../components/grid-selector/grid-selector";

class BetsForm extends Component {
	static propTypes = {
		racers: MobxPropTypes.observableArrayOf(PropTypes.instanceOf(Racer)).isRequired,
		user: PropTypes.instanceOf(User),
		onBetsSubmit: PropTypes.func.isRequired,
		userBet: PropTypes.object,
	};

	handleSave = async racerGridMap => {
		const { user, onBetsSubmit } = this.props;

		const betInfo = new BetInfo({
			userInfo: user.toUserInfo(),
			betsMap: racerGridMap,
		});

		await onBetsSubmit(betInfo);
		this.goToResultsPage();
	};

	render() {
		return (
			<GridSelector
				racers={this.props.racers}
				initData={this.props.userBet}
				placeholder="Укажите Ваш прогноз"
				submitButtonText="Сохранить прогноз"
				gridPositionsCount={10}
				onSave={this.handleSave}
			/>
		);
	}

	goToResultsPage() {
		this.props.history.push(URL_ROUTES.RESULTS);
	}
}

export default withRouter(BetsForm);
