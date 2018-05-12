import React from "react";
import PropTypes from "prop-types";
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
} from "../../../../vendor";

import "./navigation-bar.css";
import { pathNames } from "../../../../routes/routes";
import ProfileDropdown from "./profile-dropdown";
import User from "../../../../domain/user";
import NavLink from "../../../common/smart-nav-link";
import { BET_BUTTON_CHANGE_VOTE_TEXT, BET_BUTTON_VOTE_TEXT } from "../../../../constants/texts";

@inject(stores => ({
	isAuthenticated: stores.appStore.isUserAuthenticated,
	authenticatedUser: stores.appStore.authenticatedUser,
	isBetsAllowed: stores.appStore.isBetsAllowed,
	isUserAlreadyBet: stores.appStore.isUserAlreadyBet,
}))
@observer
class NavigationBar extends React.Component {
	static propTypes = {
		isAuthenticated: PropTypes.bool.isRequired,
		isBetsAllowed: PropTypes.bool.isRequired,
		isUserAlreadyBet: PropTypes.bool.isRequired,
		authenticatedUser: PropTypes.instanceOf(User),
	};

	@observable isOpen = false;

	@action
	handleToggle = () => {
		this.isOpen = !this.isOpen;
	};

	render() {
		const { isAuthenticated, authenticatedUser, isBetsAllowed, isUserAlreadyBet } = this.props;

		return (
			<Navbar className="navigation-bar" color="dark" dark expand="md" fixed="top">
				<Container>
					<NavLink path={pathNames.HOME} className="navbar-brand">
						Formula 1 Bets App
					</NavLink>
					<NavbarToggler onClick={this.handleToggle} />
					<Collapse isOpen={this.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									Голосование
								</DropdownToggle>
								<DropdownMenu className="nav-bar-drop-down-menu" right>
									{isAuthenticated && (
										<DropdownItem disabled={!isBetsAllowed}>
											<NavLink
												path={pathNames.BETS}
												className="nav-bar-drop-down-menu__link"
												disabled={!isBetsAllowed}
											>
												{!isUserAlreadyBet ? BET_BUTTON_VOTE_TEXT : BET_BUTTON_CHANGE_VOTE_TEXT}
											</NavLink>
										</DropdownItem>
									)}
									<DropdownItem>
										<NavLink path={pathNames.RESULTS} className="nav-bar-drop-down-menu__link">
											Результаты голосования
										</NavLink>
									</DropdownItem>
									{isAuthenticated && (
										<DropdownItem>
											<NavLink
												path={pathNames.BETS_HISTORY}
												className="nav-bar-drop-down-menu__link"
											>
												История Ваших голосований
											</NavLink>
										</DropdownItem>
									)}
								</DropdownMenu>
							</UncontrolledDropdown>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									Чемпионат
								</DropdownToggle>
								<DropdownMenu className="nav-bar-drop-down-menu" right>
									<DropdownItem>
										<NavLink path={pathNames.CALENDAR} className="nav-bar-drop-down-menu__link">
											Календарь
										</NavLink>
									</DropdownItem>
									<DropdownItem>
										<NavLink path={pathNames.RACERS} className="nav-bar-drop-down-menu__link">
											Гонщики
										</NavLink>
									</DropdownItem>
									<DropdownItem>
										<NavLink path={pathNames.TEAMS} className="nav-bar-drop-down-menu__link">
											Команды
										</NavLink>
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
							{!isAuthenticated ? (
								<NavItem>
									<NavLink path={pathNames.LOGIN} className="nav-link">
										Вход
									</NavLink>
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
