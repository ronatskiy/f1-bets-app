import React from "react";
import { Container, Row, Col } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import * as faTelegram from "@fortawesome/fontawesome-free-brands/faTelegram";

import "./styles.css";

const Footer = ({ className = "" }) => {
	return (
		<footer className={`${className} footer`}>
			<Container>
				<Row className="footer__social-media-links">
					<Col className="footer__copyright">&copy; 2018 - F1 fun's team</Col>
					<Col xs="2">
						<Row className="social-media-links">
							<Col className="social-media-links__telegram-box">
								<a href="https://t.me/f1funteam" className="footer__link social-media-links__link">
									<FontAwesomeIcon icon={faTelegram} />
								</a>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
