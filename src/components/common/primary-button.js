import React from "react";
import { Button } from "reactstrap";

const PrimaryButton = ({ className, onClick, disabled, children, size }) => (
	<Button className={className} onClick={onClick} disabled={disabled} color="primary" size={size}>
		{children}
	</Button>
);

export default PrimaryButton;
