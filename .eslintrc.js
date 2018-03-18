/* eslint-disable multiline-comment-style */

module.exports = {
	parser: "babel-eslint",
	parserOptions: {
		ecmaVersion: 2017,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
			experimentalObjectRestSpread: true,
		},
	},
	env: {
		es6: true,
	},
	plugins: ["babel", "prettier", "react",],
	rules: {
		// PRETTIER

		"prettier/prettier": "error",
	},
};
