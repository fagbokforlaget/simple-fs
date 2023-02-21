const webpack = require('webpack');
const path = require('path');

const libraryName = 'SimpleFS';

let outputFile = `${libraryName}.js`;

module.exports =  {
  mode: 'production',
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryExport: 'default',
    libraryTarget: 'umd',
    globalObject: `typeof self !== 'undefined' ? self : this`,
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
        options: {
          formatter: require("eslint/lib/cli-engine/formatters/stylish")
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, "src"),
      "node_modules"
    ],
    alias: {
      dexie: path.resolve(__dirname, 'node_modules/dexie/dist/dexie.min'),
    }
  },
  plugins: [
		new webpack.DefinePlugin({
    	'process.env.NODE_ENV': '"production"'
    })
  ]
};
