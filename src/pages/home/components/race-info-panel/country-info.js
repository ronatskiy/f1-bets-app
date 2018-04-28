import React from "react";
import PropTypes from "prop-types";

import "./country-info.css";

const CountryInfo = ({ className = "", countryName, flagUrl }) => (
	<div className={`country-info ${className}`}>
		<div className="country-info__flag">
			<img className="country-info__flag-image" src={flagUrl} alt={countryName} />
		</div>
		<div className="country-info__country-name">{countryName}</div>
	</div>
);

CountryInfo.propTypes = {
	className: PropTypes.string,
	countryName: PropTypes.string.isRequired,
	flagUrl: PropTypes.string.isRequired,
};

export default CountryInfo;
