const rewireMobX = require("react-app-rewire-mobx");
const dotenv = require("dotenv");
dotenv.config();

module.exports = function override(config, env) {
	config = rewireMobX(config, env);
	return config;
};
