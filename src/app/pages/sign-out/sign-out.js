import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

import { pathNames } from "../../routes/routes";

@inject(({ rootStore: { sessionStore } }) => ({
	isAuthenticated: sessionStore.isAuthenticated,
	signOut: () => {
		sessionStore.signOut();
	},
}))
@observer
class SignOutPage extends Component {
	static propTypes = {
		signOut: PropTypes.func.isRequired,
		isAuthenticated: PropTypes.bool.isRequired,
	};

	componentDidMount() {
		this.props.signOut();
	}

	render() {
		return (
			<Container>
				{this.props.isAuthenticated ? (
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

export default SignOutPage;
