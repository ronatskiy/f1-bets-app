import React from "react";
import { Button } from "../../../vendor";
import "./primary-button.css";

const PrimaryButton = ({ className, onClick, disabled, children, size, ...props }) => (
	<Button
		className={`button button--primary ${className}`}
		onClick={onClick}
		disabled={disabled}
		color="primary"
		size={size}
		{...props}
	>
		{children}
	</Button>
);

export default PrimaryButton;
