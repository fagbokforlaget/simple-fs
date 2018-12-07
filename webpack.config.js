const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const libraryName = 'SimpleFS';

let outputFile = libraryName + '.min.js';

module.exports =  {
  mode: 'production',
  entry:['babel-polyfill', __dirname + '/src/index.js'],
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
			{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [ '@babel/env', { modules: false } ]
          ]
        }
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, "src"),
      "node_modules"
    ]
  },
	optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
	},
  plugins: [
		new webpack.DefinePlugin({
    	'process.env.NODE_ENV': '"production"'
    })
  ]
};
