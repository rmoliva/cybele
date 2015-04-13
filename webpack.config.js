var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = module.exports = {
  // the base path which will be used to resolve entry points
  context: __dirname,
  // the main entry point for our application's frontend JS
  entry: './app/frontend/entry.js',
  
  output: {
    // this is our app/assets/javascripts directory, which is part of the Sprockets pipeline
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    // the filename of the compiled bundle, e.g. app/assets/javascripts/bundle.js
    filename: 'bundle.js',
    chunkFilename: "[id].js",
    // if the webpack code-splitting feature is enabled, this is the path it'll use to download bundles
    publicPath: '/assets',
    
    // http://clarkdave.net/2015/01/how-to-use-webpack-with-rails/
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',    
  },
  module: {
    loaders: [{
      //tell webpack to use jsx-loader for all *.jsx files
      test: /\.jsx$/,
      loader: 'jsx-loader?insertPragma=React.DOM&harmony'
    },  // Extract css files
    {
      test: /\.css$/,
      loader: "style-loader!css-loader!"// ExtractTextPlugin.extract("style-loader", "css-loader")
    },
    // Optionally extract less files
    // or any other compile-to-css language
    {
      test: /\.less$/,
      loader: "style-loader!css-loader!less-loader!" // ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
    }, {
      test: /\.scss$/,
      loader: "style-loader!css-loader!sass-loader!"
    }, { 
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      loader: "url-loader?limit=10000&minetype=application/font-woff" 
    }, { 
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      loader: "file-loader" 
    }, {
      test: /\.(png|gif|jpg)$/,
      loader: "file-loader"
    }]
  },
  resolve: {
    // tell webpack which extensions to auto search when it resolves modules. With this,
    // you'll be able to do `require('./utils')` instead of `require('./utils.js')`
    extensions: ['', '.js', '.jsx', '.less', '.css', '.scss'],
    // by default, webpack will search in `web_modules` and `node_modules`. Because we're using
    // Bower, we want it to look in there too
    modulesDirectories: [ './vendor/assets/bower_components' ],
  },
  plugins: [
    new ExtractTextPlugin("bundle.css"),
    // we need this plugin to teach webpack how to find module entry points for bower files,
    // as these may not have a package.json file
    new webpack.ResolverPlugin([
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
/*      scaleApp: 'scaleApp',
      Bluebird: 'bluebird',
      React: 'react',
      'bootstrap-sass': 'bootstrap-sass',
      bootstrap: 'bootstrap',
      Signals: 'signals',
      Hasher: 'hasher',
      Crossroads: 'crossroads',
      Moment: 'moment',
      Amplify: 'amplify',
      Modernizr: 'modernizr',
      Parsley: 'parsley'
*/
    })    
  ]
};