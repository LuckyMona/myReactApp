var webpack = require("webpack");

module.exports = {
	entry:{
		index:'./index.js',
		vendor: [
          'react',
          'react-dom',
        ]
	},
	output: {
		path: "./build/",
		filename:'[name].js',
		publicPath:"/build/"
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	devServer: { inline: true,hot: true, historyApiFallback: true,},
	module: {
		loaders: [
		 	{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: ['react-hot', 'babel'],

			},
			{test: /\.css$/, loader: 'style!css'}
		]
	 },
	// devtool:'source-map',
	// 生成的sourcemap的方式
	devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
	plugins:[
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js",Infinity),
		new webpack.HotModuleReplacementPlugin()
	],
};