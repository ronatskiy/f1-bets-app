import React from "react";
import PropTypes from "prop-types";

import TextLink from "../../../../components/common/text-link";
import "./country-info.css";

const CountryInfo = ({ className = "", countryName, flagUrl, countryUrl }) => (
	<div className={`country-info ${className}`}>
		<div className="country-info__flag">
			<img className="country-info__flag-image" src={flagUrl} alt={countryName} />
		</div>
		<TextLink href={countryUrl} target="_blank" className="country-info__country-name">
			{countryName}
		</TextLink>
	</div>
);

CountryInfo.propTypes = {
	className: PropTypes.string,
	countryName: PropTypes.string.isRequired,
	flagUrl: PropTypes.string.isRequired,
};

export default CountryInfo;
