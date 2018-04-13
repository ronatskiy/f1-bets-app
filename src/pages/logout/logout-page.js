import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

import { pathNames } from "../../routes/routes";

@inject("logoutPageStore")
@observer
class LogoutPage extends Component {
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
		const { logoutPageStore } = this.props;
		return (
			<Container>
				{logoutPageStore.isUserAuthenticated ? (
					<Row>
						<Col>Идет обработка...</Col>
					</Row>
				) : (
					<Fragment>
						<Row>
							<Col>Мы будем скучать по тебе :)</Col>
						</Row>
						<Row>
							<Col>
								<Link to={pathNames.HOME}>Вернуться на главную</Link>
							</Col>
						</Row>
					</Fragment>
				)}
			</Container>
		);
	}
}

export default LogoutPage;
