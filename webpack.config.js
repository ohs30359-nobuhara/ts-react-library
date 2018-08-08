const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const loader = require('./script/compile');

module.exports = {
  entry: loader(__dirname),
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: '[name]',
    library: '',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx|ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
  ]
};
