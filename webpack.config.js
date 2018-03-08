const path = require('path'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  StyleLintPlugin = require('stylelint-webpack-plugin'),
  BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './src/App.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.json']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('autoprefixer')({ browsers: 'last 2 versions' }),
                  require('css-mqpacker')({ sort: true })
                ],
                sourceMap: 'inline'
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: ['node_modules/sanitize.scss'],
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.svg$/,
        use: ['svg-sprite-loader', 'svgo-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              name: '[name].[ext]'
            }
          },
          'img-loader'
        ]
      },
      {
        enforce: 'pre',
        test: /\.jsx$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new StyleLintPlugin(),
    new ExtractTextPlugin('../style.css'),
    new BrowserSyncPlugin({
      files: '**/*.php',
      injectChanges: true,
      proxy: 'http://aurora.local'
    })
  ]
};
