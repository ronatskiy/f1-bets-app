import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { observable, action } from "mobx";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	Container,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";

import "./navigation-bar.css";
import { pathNames } from "../../../../routes/routes";
import ProfileDropdown from "./profile-dropdown";
import User from "../../../../domain/user";

@inject(stores => ({
	isAuthenticated: stores.appStore.isUserAuthenticated,
	authenticatedUser: stores.appStore.authenticatedUser,
	isBetsAllowed: stores.appStore.isBetsAllowed,
}))
@observer
class NavigationBar extends React.Component {
	static propTypes = {
		isAuthenticated: PropTypes.bool.isRequired,
		isBetsAllowed: PropTypes.bool.isRequired,
		authenticatedUser: PropTypes.instanceOf(User),
	};

	@observable isOpen = false;

	@action
	handleToggle = () => {
		this.isOpen = !this.isOpen;
	};

	render() {
		const { isAuthenticated, authenticatedUser, isBetsAllowed } = this.props;

		return (
			<Navbar className="navigation-bar" color="dark" dark expand="md" fixed="top">
				<Container>
					<Link to={pathNames.HOME} className="navbar-brand">
						Formula 1 Bets App
					</Link>
					<NavbarToggler onClick={this.handleToggle} />
					<Collapse isOpen={this.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<Link to={pathNames.CALENDAR} className="nav-link">
									Календарь
								</Link>
							</NavItem>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									Статистика
								</DropdownToggle>
								<DropdownMenu className="nav-bar-drop-down-menu" right>
									<DropdownItem>
										<Link to={pathNames.RESULTS} className="nav-bar-drop-down-menu__link">
											Результаты голосования
										</Link>
									</DropdownItem>
									<DropdownItem>
										<Link to={pathNames.RACERS} className="nav-bar-drop-down-menu__link">
											Гонщики
										</Link>
									</DropdownItem>
									<DropdownItem>
										<Link to={pathNames.TEAMS} className="nav-bar-drop-down-menu__link">
											Команды
										</Link>
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
							{!isAuthenticated ? (
								<NavItem>
									<Link to={pathNames.LOGIN} className="nav-link">
										Вход
									</Link>
								</NavItem>
							) : (
								authenticatedUser && (
									<ProfileDropdown user={authenticatedUser} isBetsAllowed={isBetsAllowed} />
								)
							)}
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		);
	}
}

export default NavigationBar;
