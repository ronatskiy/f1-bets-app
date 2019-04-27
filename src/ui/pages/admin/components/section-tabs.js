import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import { Badge, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "../../../../vendors";

import RaceSection from "../races-section";
import UsersSection from "../users-section";

@inject(stores => ({
	usersCount: stores.adminPageStore.usersSectionStore.users.length,
}))
@observer
class SectionTabs extends Component {
	@observable activeTab = "1";

	@action
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
							className={this.activeTab === "1" ? "active" : ""}
							onClick={() => {
								this.toggle("1");
							}}
						>
							Users{" "}
							<Badge color="secondary" pill>
								{usersCount}
							</Badge>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={this.activeTab === "2" ? "active" : ""}
							onClick={() => {
								this.toggle("2");
							}}
						>
							Races
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={this.activeTab}>
					<TabPane tabId="1">
						<Row>
							<Col sm="12">
								<UsersSection />
							</Col>
						</Row>
					</TabPane>
					<TabPane tabId="2">
						<Row>
							<Col sm="12">
								<RaceSection />
							</Col>
						</Row>
					</TabPane>
				</TabContent>
			</div>
		);
	}
}

export default SectionTabs;
