import React from "react";
import PropTypes from "prop-types";
import { pathNames } from "../../../../../routes/routes";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { User } from "../../../../../../storage";
import { Link } from "react-router-dom";

const ProfileDropdown = ({ user }) => {
	const { isAdmin, name } = user;
	return (
		<UncontrolledDropdown nav inNavbar>
			<DropdownToggle nav caret>
				Профиль
			</DropdownToggle>
			<DropdownMenu className="nav-bar-drop-down-menu">
				<DropdownItem header>{name}</DropdownItem>
				{isAdmin && (
					<DropdownItem>
						<Link to={pathNames.ADMIN} className="nav-bar-drop-down-menu__link">
							Админка
						</Link>
					</DropdownItem>
				)}
				<DropdownItem>
					<Link to={pathNames.BETS} className="nav-bar-drop-down-menu__link">
						Голосование
					</Link>
				</DropdownItem>
				<DropdownItem>
					<Link to={pathNames.BETS_HISTORY} className="nav-bar-drop-down-menu__link">
						История ставок
					</Link>
				</DropdownItem>
				<DropdownItem divider />
				<DropdownItem>
					<Link to={pathNames.SIGN_OUT} className="nav-bar-drop-down-menu__link">
						Выход
					</Link>
				</DropdownItem>
			</DropdownMenu>
		</UncontrolledDropdown>
	);
};

ProfileDropdown.propTypes = {
	user: PropTypes.instanceOf(User).isRequired,
};

export default ProfileDropdown;
