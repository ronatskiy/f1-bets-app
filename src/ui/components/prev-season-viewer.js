import React from "react";
import PropTypes from "prop-types";
import { Button } from "../../vendors";

class PrevSeasonViewer extends React.Component {
	static propTypes = {
		season: PropTypes.string.isRequired,
		seasonTitle: PropTypes.string.isRequired,
		loadSeasonButtonCaption: PropTypes.string.isRequired,
		isSeasonLoaded: PropTypes.bool.isRequired,
		onLoadSeason: PropTypes.func.isRequired,
		children: PropTypes.node,
	};

	_handleLoadSeason = () => {
		this.props.onLoadSeason(this.props.season);
	};

	render() {
		const { isSeasonLoaded, seasonTitle, loadSeasonButtonCaption } = this.props;

		return (
			<>
				<section className="section text-center">
					{isSeasonLoaded ? (
						seasonTitle
					) : (
						<Button className="button" color="secondary" onClick={this._handleLoadSeason}>
							{loadSeasonButtonCaption}
						</Button>
					)}
				</section>
				{this.props.children}
			</>
		);
	}
}

export default PrevSeasonViewer;
