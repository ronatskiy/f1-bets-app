import React,{ Component } from "react";
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import RaceSection from "./race-section";
import UsersSection from "./users-section";

class SectionTabs extends Component {
	state = {
		activeTab: "1",
	};

	toggle = tab => {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab,
			});
		}
	};
	render() {
		return (
			<div>
				<Nav tabs>
					<NavItem>
						<NavLink
							className={`${this.state.activeTab === "1" ? "active" : ""}`}
							onClick={() => {
								this.toggle("1");
							}}
						>
							Races
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={`${this.state.activeTab === "2" ? "active" : ""}`}
							onClick={() => {
								this.toggle("2");
							}}
						>
							Users
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={this.state.activeTab}>
					<TabPane tabId="1">
						<Row style={{ marginTop: "1rem" }}>
							<Col sm="12">
								<h4>Races details</h4>
								<RaceSection />
							</Col>
						</Row>
					</TabPane>
					<TabPane tabId="2">
						<Row style={{ marginTop: "1rem" }}>
							<Col sm="12">
								<h4>Users Details</h4>
								<UsersSection />
							</Col>
						</Row>
					</TabPane>
				</TabContent>
			</div>
		);
	}
}

export default SectionTabs;
