var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

module.exports = {
  entry: {
    app : './src/index.js',
    contact : './src/contact.js'
  },
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader','sass-loader'],
          publicPath: '/dist'
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
      //['style-loader','css-loader','sass-loader']
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    stats: 'errors-only',
    open: true
  },
  plugins:[
    new HtmlWebpackPlugin({
      title: 'Project Demo',
      minify: {
        collapseWhitespace: false
      },
      hash: true,
      excludeChunks: ['contact'],
      template: './src/index.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Contact Page',
      hash: true,
      filename: 'contact.html',
      chunks: ['contact'],
      template: './src/contact.html',
    }),
    new ExtractTextPlugin({
      filename: "app.css",
      disable: false,
      allChunks: true
    })
  ]
}
