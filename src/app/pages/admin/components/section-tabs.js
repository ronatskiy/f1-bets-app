import React, { Component } from "react";
import { Badge, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";

import RaceSection from "./race-section";
import UsersSection from "./users-section";

@inject(stores => ({
	usersCount: stores.rootStore.userStore.users.length,
}))
@observer
class SectionTabs extends Component {
	@observable activeTab = "1";

	toggle = tab => {
		if (this.activeTab !== tab) {
			this.activeTab = tab;
		}
	};

	render() {
		const { usersCount } = this.props;

		return (
			<div>
				<Nav tabs>
					<NavItem>
						<NavLink
							className={`${this.activeTab === "1" ? "active" : ""}`}
							onClick={() => {
								this.toggle("1");
							}}
						>
							Races
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={`${this.activeTab === "2" ? "active" : ""}`}
							onClick={() => {
								this.toggle("2");
							}}
						>
							Users{" "}
							<Badge color="secondary" pill>
								{usersCount}
							</Badge>
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={this.activeTab}>
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
