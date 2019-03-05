import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { Badge } from "../../../../../vendor";

import "./cell.css";

class Cell extends React.Component {
	static propTypes = {
		points: PropTypes.number,
		text: PropTypes.string,
		isBadgeVisible: PropTypes.bool,
	};

	static defaultProps = {
		points: 0,
		isBadgeVisible: false,
		text: "",
	};

	render() {
		const { text, /** @type {number} */ points, isBadgeVisible } = this.props;
		const classNames = cn("polling-result-cell", {
			"text-success": isBadgeVisible && points === 10,
			"text-warning": isBadgeVisible && points > 0 && points < 10,
			"text-secondary text--line-through": isBadgeVisible && points === 0,
		});

		return (
			<div className={classNames}>
				{text}
				{isBadgeVisible && text && (
					<Badge className="polling-result-cell__badge" color="light" pill>
						{points}
					</Badge>
				)}
			</div>
		);
	}
}

export default Cell;
