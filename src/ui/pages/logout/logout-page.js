import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "../../../vendors";

import { URL_ROUTES } from "../../routes/url-routes";

@inject("logoutPageStore")
@observer
class LogoutPage extends React.Component {
	static propTypes = {
		logoutPageStore: PropTypes.shape({
			isUserAuthenticated: PropTypes.bool.isRequired,
			logout: PropTypes.func.isRequired,
		}).isRequired,
	};

	componentDidMount() {
		this.props.logoutPageStore.logout();
	}

	render() {
		const { isUserAuthenticated } = this.props.logoutPageStore;

		return (
			<Container className="page">
				<Row>
					{isUserAuthenticated ? (
						<Col>Идет обработка...</Col>
					) : (
						<Col lg={{ size: 6, offset: 3 }} md={{ size: 8, offset: 2 }}>
							<div>Мы будем скучать по тебе :)</div>
							<div>
								<Link to={URL_ROUTES.HOME}>Вернуться на главную</Link>
							</div>
						</Col>
					)}
				</Row>
			</Container>
		);
	}
}

export default LogoutPage;
