import React from "react";
import PropTypes from "prop-types";
import { Badge } from "reactstrap";

import "./bet-result-cell.css";

class BetResultCell extends React.Component {
	static propTypes = {
		points: PropTypes.number,
		className: PropTypes.string.isRequired,
		text: PropTypes.string,
		isBadgeVisible: PropTypes.bool,
	};

	static defaultProps = {
		points: 0,
		isBadgeVisible: false,
		text: "",
	};

	render() {
		const { className, text, points, isBadgeVisible } = this.props;

		return (
			<div className={`bet-result-cell ${className}`}>
				{text}
				{isBadgeVisible &&
					text && (
						<Badge className="bet-result-cell__badge" color="light" pill>
							{points}
						</Badge>
					)}
			</div>
		);
	}
}

export default BetResultCell;
