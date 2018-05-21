import React from "react";
import PropTypes from "prop-types";
import { findFlagUrlByNationality } from "country-flags-svg";

import "./index.css";

const NationalizedLink = ({ text, url, nationality }) => (
	<a target="_blank" href={url}>
		<img className="nationalized-link__flag" src={findFlagUrlByNationality(nationality)} alt={nationality} />
		<span>{text}</span>
	</a>
);

NationalizedLink.propTypes = {
	text: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	nationality: PropTypes.string.isRequired,
};

export default NationalizedLink;
