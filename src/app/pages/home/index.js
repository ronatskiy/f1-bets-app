import React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Jumbotron } from "reactstrap";
import { pathNames } from "../../routes/routes";

const HomePage = ({ nextRace = null, isCurrentUserAlreadyBet = false }) => (
	<Container className="home-page">
		<Row>
			<Col>
				{nextRace && (
					<Jumbotron>
						<h1 className="display-4">{nextRace.location} уже скоро!</h1>
						<p className="lead">Сейчас принимаются ставки на {nextRace.prettyTitle}.</p>
						<p>Напоминаем, что Вы можете сделать свой прогноз лишь до начала субботней квалификации.</p>
						<p className="lead">
							<Link to={pathNames.BETS} role="button" className="btn btn-primary btn-lg">
								{!isCurrentUserAlreadyBet ? "Голосование" : "Изменить прогноз"}
							</Link>
						</p>
					</Jumbotron>
				)}
			</Col>
		</Row>
	</Container>
);

export default inject(stores => ({
	isCurrentUserAlreadyBet: stores.rootStore.userStore.isCurrentUserAlreadyBet,
	nextRace: stores.rootStore.racesStore.nextRace,
}))(observer(HomePage));
