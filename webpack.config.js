const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// const helpers = require('./helpers');

// const entries = {};

// Object.keys(slsw.lib.entries).forEach(
//   key => (entries[key] = ['./source-map-install.js', slsw.lib.entries[key]])
// );

module.exports = {
  // We use webpack-node-externals to excludes all node deps.
  // You can manually set the externals too.
  externals: [nodeExternals()],
  devtool: 'source-map',
  entry: slsw.lib.entries,
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],

    // An array of directory names to be resolved to the current directory
    // modules: [helpers.root('node_modules')],

    plugins: [
      /**
       * Use this to load modules whose location is specified in the paths
       * section of tsconfig.json when using webpack.
       */
      new TsconfigPathsPlugin()
    ]
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  plugins: [],
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  stats: 'minimal', // errors-only, minimal, none, normal, verbose
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, '.webpack'),
    filename: '[name].js'
  }
};
