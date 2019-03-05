import React from "react";
import { Container, Row, Col } from "../../../vendor";
import { ReactComponent as TelegramIcon } from "../../images/telegram.svg";

import "./styles.css";

const CURRENT_YEAR = new Date().getFullYear();

const Footer = ({ className = "" }) => {
	return (
		<footer className={`${className} footer`}>
			<Container>
				<Row className="footer__social-media-links">
					<Col className="footer__copyright">&copy; 2018 - {CURRENT_YEAR} F1 fun's team</Col>
					<Col xs="2">
						<Row className="social-media-links">
							<Col className="social-media-links__telegram-box">
								<a href="https://t.me/f1funteam" className="footer__link social-media-links__link">
									<TelegramIcon className="social-media-links__icon" />
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
