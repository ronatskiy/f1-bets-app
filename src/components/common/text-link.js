import React from "react";
import cn from "classnames";

import "./text-link.css";

const TextLink = ({ className, children, ...props }) => (
	<a className={cn("text-link", className)} {...props}>
		{children}
	</a>
);

export default TextLink;
