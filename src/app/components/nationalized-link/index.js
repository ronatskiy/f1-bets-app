import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { getFlagUrl } from "../../lib/country-flags/index";
import "./index.css";

const NationalizedLink = ({ text, url, nationality }) => (
	<Fragment>
		<a target="_blank" href={url}>
			<img className="nationalized-link__flag" src={getFlagUrl(nationality)} alt={nationality} />
			<span>{text}</span>
		</a>
	</Fragment>
);

NationalizedLink.propTypes = {
	text: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	nationality: PropTypes.string.isRequired,
};

export default NationalizedLink;
