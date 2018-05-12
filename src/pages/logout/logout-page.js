import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "../../vendor";

import { pathNames } from "../../routes/routes";

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
			<Container>
				<Row className="section">
					{isUserAuthenticated ? (
						<Col>Идет обработка...</Col>
					) : (
						<Col lg={{ size: 6, offset: 3 }} md={{ size: 8, offset: 2 }}>
							<div>Мы будем скучать по тебе :)</div>
							<div>
								<Link to={pathNames.HOME}>Вернуться на главную</Link>
							</div>
						</Col>
					)}
				</Row>
			</Container>
		);
	}
}

export default LogoutPage;
