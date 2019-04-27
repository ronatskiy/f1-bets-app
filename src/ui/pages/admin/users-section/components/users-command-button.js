import React from "react";
import PropTypes from "prop-types";
import { Button } from "../../../../../vendors";

export function UsersCommandButton({ userId, onClick, children }) {
	const handleClick = () => {
		onClick(userId);
	};

	return (
		<Button onClick={handleClick} type="button" size="sm">
			{children}
		</Button>
	);
}

UsersCommandButton.propTypes = {
	userId: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	children: PropTypes.string.isRequired,
};
