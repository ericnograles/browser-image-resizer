const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'BrowserImageResizer',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "targets": {
                    "browsers": ["last 2 versions", "ie >= 11"]
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  }
};

if (process.env.NODE_ENV !== 'production') {
  module.exports.devtool = 'eval-source-map'
}
