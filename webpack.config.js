
var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: "./app-client.js",
	output: {
		filename: "public/bundle.js",

	},
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				exclude: /(node_modules)/,
				loader:'babel',
				query: {
        			presets: ['es2015', 'react']
      			}
			}
		]
	},
	resolve: {
		extensions: ['', '.jsx', '.js']
	},
	plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  	]
};