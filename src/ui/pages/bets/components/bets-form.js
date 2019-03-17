import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { URL_ROUTES } from "../../../routes/url-routes";
import Racer from "../../../../domain/racer";
import BetInfo from "../../../../domain/bet-info";
import User from "../../../../domain/user";
import GridSelector from "../../../components/grid-selector/grid-selector";

class BetsForm extends Component {
	static propTypes = {
		racers: PropTypes.arrayOf(PropTypes.instanceOf(Racer)).isRequired,
		user: PropTypes.instanceOf(User),
		onBetsSubmit: PropTypes.func.isRequired,
		usersBet: PropTypes.object,
	};

	_handleSave = async racerGridMap => {
		const { user, onBetsSubmit } = this.props;

		const betInfo = new BetInfo({
			userInfo: user.toUserInfo(),
			betsMap: racerGridMap,
		});

		await onBetsSubmit(betInfo);
		this._goToResultsPage();
	};

	_goToResultsPage() {
		this.props.history.push(URL_ROUTES.RESULTS);
	}

	render() {
		const { racers, usersBet } = this.props;

		return (
			<GridSelector
				racers={racers}
				initData={usersBet}
				placeholder="Укажите Ваш прогноз"
				submitButtonText="Сохранить прогноз"
				gridPositionsCount={10}
				onSave={this._handleSave}
			/>
		);
	}
}

export default withRouter(BetsForm);
