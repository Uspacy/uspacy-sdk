module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
		'simple-import-sort',
	],
	rules: {
		quotes: ['error', 'single'],
		'max-len': [
			'error',
			{
				ignorePattern: '^import [^,]+ from |^export | implements',
				code: 150,
			},
		],
		'simple-import-sort/imports': 'warn',
		'comma-dangle': ['error', 'always-multiline'],
		indent: 'off',
		'@typescript-eslint/indent': ['error', 'tab', { SwitchCase: 1 }],
		'spaced-comment': [
			'error',
			'always',
			{ 'markers': ['/'] },
		],
		'no-trailing-spaces': 'error',
		semi: ['error', 'always'],
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': ['error'],
		'jsx-quotes': ['error', 'prefer-double'],
		'arrow-parens': ['warn', 'always'],
	},
	ignorePatterns: ['lib/'],
};
