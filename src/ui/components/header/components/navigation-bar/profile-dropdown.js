import React from "react";
import PropTypes from "prop-types";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "../../../../../vendors";

import { URL_ROUTES } from "../../../../routes/url-routes";
import User from "../../../../../domain/user";
import NavLink from "../../../common/smart-nav-link";

const ProfileDropdown = ({ user, onClose }) => {
	const { name } = user;

	return (
		<UncontrolledDropdown nav inNavbar>
			<DropdownToggle nav caret>
				Профиль
			</DropdownToggle>
			<DropdownMenu className="nav-bar-drop-down-menu" right>
				<DropdownItem header>{name}</DropdownItem>
				<DropdownItem>
					<NavLink path={URL_ROUTES.PROFILE} className="nav-bar-drop-down-menu__link" onClick={onClose}>
						Редактировать профиль
					</NavLink>
				</DropdownItem>
				<DropdownItem divider />
				<DropdownItem>
					<NavLink path={URL_ROUTES.LOGOUT} className="nav-bar-drop-down-menu__link" onClick={onClose}>
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
