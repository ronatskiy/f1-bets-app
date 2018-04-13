import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import { Button } from "reactstrap";

class BetButton extends React.Component {
	static propTypes = {
		isBetsAllowed: PropTypes.bool.isRequired,
		isUserAlreadyBet: PropTypes.bool.isRequired,
		onClick: PropTypes.func.isRequired,
	};

	render() {
		const { isBetsAllowed, isUserAlreadyBet, onClick } = this.props;

		return (
			<Button color="primary" size="lg" disabled={!isBetsAllowed} onClick={onClick}>
				{!isUserAlreadyBet ? "Голосование" : "Изменить прогноз"}
			</Button>
		);
	}
}

export default inject(stores => ({
	isBetsAllowed: stores.homePageStore.isBetsAllowed,
	isUserAlreadyBet: stores.homePageStore.isUserAlreadyBet,
}))(observer(BetButton));
