import React from "react";
import { observer } from "mobx-react";
import { Container, Row, Col } from "../../../vendors";

import "./styles.css";
import SectionTabs from "./components/section-tabs";

@observer
class AdminPage extends React.Component {
	render() {
		return (
			<Container tag="section" className="page">
				<Row>
					<Col>
						<h1 className="page-title">Admin Page</h1>
					</Col>
				</Row>
				<SectionTabs />
			</Container>
		);
	}
}

export default AdminPage;
