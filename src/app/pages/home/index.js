import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Jumbotron, Button } from "reactstrap";

import { pathNames } from "../../routes/routes";
import { Race } from "../../../storage";

class HomePage extends Component {
	handleBetButtonClick = () => {
		this.props.history.push(pathNames.BETS);
	};
	render() {
		const { nextRace = null, isCurrentUserAlreadyBet = false, isBetsAllowed } = this.props;
		return (
			<Container className="home-page">
				<Row>
					<Col>
						{nextRace && (
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
									Напоминаем, что Вы можете делать свой прогноз лишь до начала субботней квалификации.
									Нова возможность оставить свой прогноз на будущую гонку у Вас появится после начала
									этой.
								</p>
								<p className="lead">
									<Button
										color="primary"
										size="lg"
										disabled={!isBetsAllowed}
										onClick={this.handleBetButtonClick}
									>
										{!isCurrentUserAlreadyBet ? "Голосование" : "Изменить прогноз"}
									</Button>
								</p>
							</Jumbotron>
						)}
					</Col>
				</Row>
			</Container>
		);
	}
}
HomePage.propTypes = {
	isCurrentUserAlreadyBet: PropTypes.bool.isRequired,
	isBetsAllowed: PropTypes.bool.isRequired,
	nextRace: PropTypes.instanceOf(Race),
};

export default inject(stores => ({
	isCurrentUserAlreadyBet: stores.rootStore.userStore.isCurrentUserAlreadyBet,
	nextRace: stores.rootStore.racesStore.nextRace,
	isBetsAllowed: stores.rootStore.appStore.isBetsAllowed,
}))(withRouter(observer(HomePage)));
