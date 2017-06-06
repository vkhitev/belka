const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: (process.env.NODE_ENV === 'production') ? '' : 'eval-source-map',
  entry: {
    blog: './web-server/public/src/blog/index.js',
    admin: './web-server/public/src/admin/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'web-server/public/dist'),
    publicPath: 'dist/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether'
    })
  ]
}
