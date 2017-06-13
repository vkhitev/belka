const path = require('path')

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
      }
    ]
  }
}
