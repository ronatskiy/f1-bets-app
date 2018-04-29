import React from "react";
import PropTypes from "prop-types";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";

import { pathNames } from "../../../../routes/routes";
import User from "../../../../domain/user";
import NavLink from "../../../common/smart-nav-link";

const ProfileDropdown = ({ user, isBetsAllowed }) => {
	const { isAdmin, name } = user;

	return (
		<UncontrolledDropdown nav inNavbar>
			<DropdownToggle nav caret>
				Профиль
			</DropdownToggle>
			<DropdownMenu className="nav-bar-drop-down-menu" right>
				<DropdownItem header>{name}</DropdownItem>
				{isAdmin && (
					<DropdownItem>
						<NavLink path={pathNames.ADMIN} className="nav-bar-drop-down-menu__link">
							Админка
						</NavLink>
					</DropdownItem>
				)}
				<DropdownItem disabled>
					<NavLink path={pathNames.BETS} disabled className="nav-bar-drop-down-menu__link">
						Редактировать профиль
					</NavLink>
				</DropdownItem>
				<DropdownItem>
					<NavLink path={pathNames.BETS_HISTORY} className="nav-bar-drop-down-menu__link">
						История голосований
					</NavLink>
				</DropdownItem>
				<DropdownItem divider />
				<DropdownItem>
					<NavLink path={pathNames.LOGOUT} className="nav-bar-drop-down-menu__link">
						Выход
					</NavLink>
				</DropdownItem>
			</DropdownMenu>
		</UncontrolledDropdown>
	);
};

ProfileDropdown.propTypes = {
	user: PropTypes.instanceOf(User).isRequired,
	isBetsAllowed: PropTypes.bool.isRequired,
};

export default ProfileDropdown;
