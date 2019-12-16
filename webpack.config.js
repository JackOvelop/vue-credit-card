module.exports = {
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			}
		]
	},
};