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
} from "../../../../../vendors";

import "./navigation-bar.css";
import { URL_ROUTES } from "../../../../routes/url-routes";
import ProfileDropdown from "./profile-dropdown";
import User from "../../../../../domain/user";
import NavLink from "../../../common/smart-nav-link";
import { BET_BUTTON_CHANGE_VOTE_TEXT, BET_BUTTON_VOTE_TEXT } from "../../../../constants/texts";

@inject(({ appStore }) => ({
	isAuthenticated: appStore.isUserAuthenticated,
	authenticatedUser: appStore.authenticatedUser,
	isBetsAllowed: appStore.isBetsAllowed,
	isUserAlreadyBet: appStore.isUserAlreadyBet,
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

	closeMenu = action(() => {
		this.isOpen = false;
	});

	render() {
		const { isAuthenticated, authenticatedUser, isBetsAllowed, isUserAlreadyBet } = this.props;

		return (
			<Navbar className="navigation-bar" color="dark" dark expand="md" fixed="top">
				<Container>
					<NavLink path={URL_ROUTES.HOME} className="navbar-brand" onClick={this.closeMenu}>
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
												path={URL_ROUTES.BETS}
												className="nav-bar-drop-down-menu__link"
												disabled={!isBetsAllowed}
												onClick={this.closeMenu}
											>
												{!isUserAlreadyBet ? BET_BUTTON_VOTE_TEXT : BET_BUTTON_CHANGE_VOTE_TEXT}
											</NavLink>
										</DropdownItem>
									)}
									<DropdownItem>
										<NavLink
											path={URL_ROUTES.RESULTS}
											className="nav-bar-drop-down-menu__link"
											onClick={this.closeMenu}
										>
											Результаты голосования
										</NavLink>
									</DropdownItem>
									{isAuthenticated && (
										<DropdownItem>
											<NavLink
												path={URL_ROUTES.BETS_HISTORY}
												className="nav-bar-drop-down-menu__link"
												onClick={this.closeMenu}
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
										<NavLink
											path={URL_ROUTES.CALENDAR}
											className="nav-bar-drop-down-menu__link"
											onClick={this.closeMenu}
										>
											Календарь
										</NavLink>
									</DropdownItem>
									<DropdownItem>
										<NavLink
											path={URL_ROUTES.RACERS}
											className="nav-bar-drop-down-menu__link"
											onClick={this.closeMenu}
										>
											Гонщики
										</NavLink>
									</DropdownItem>
									<DropdownItem>
										<NavLink
											path={URL_ROUTES.TEAMS}
											className="nav-bar-drop-down-menu__link"
											onClick={this.closeMenu}
										>
											Команды
										</NavLink>
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
							{!isAuthenticated ? (
								<NavItem>
									<NavLink path={URL_ROUTES.LOGIN} className="nav-link" onClick={this.closeMenu}>
										Вход
									</NavLink>
								</NavItem>
							) : (
								authenticatedUser && (
									<>
										{authenticatedUser.isAdmin && (
											<NavItem>
												<NavLink
													path={URL_ROUTES.ADMIN}
													className="nav-link"
													onClick={this.closeMenu}
												>
													Админка
												</NavLink>
											</NavItem>
										)}
										<ProfileDropdown
											user={authenticatedUser}
											isBetsAllowed={isBetsAllowed}
											onClose={this.closeMenu}
										/>
									</>
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
