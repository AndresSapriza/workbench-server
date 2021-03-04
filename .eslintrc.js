/* eslint-disable no-tabs */
module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	parserOptions: {
		ecmaVersion: 12,
	},
	rules: {
		indent: [2, 'tab', { SwitchCase: 1, VariableDeclarator: 1 }],
		'no-tabs': 0,
		'linebreak-style': [
			'error',
			'windows',
		],
		quotes: [
			'error',
			'single',
		],
		semi: [
			'error',
			'always',
		],
	},
	extends: 'airbnb-base',
};
