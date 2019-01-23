/* eslint-disable multiline-comment-style */

module.exports = {
	extends: "react-app",
	parserOptions: {
		ecmaFeatures: {
			legacyDecorators: true
		},
	},
	plugins: ["babel", "prettier"],
	rules: {
		// PRETTIER

		"prettier/prettier": "error",
	},
};
