import React from "react";
import { Button } from "reactstrap";

const PrimaryButton = ({ className, onClick, disabled, children }) => (
	<Button className={className} onClick={onClick} disabled={disabled} color="primary">
		{children}
	</Button>
);

export default PrimaryButton;
