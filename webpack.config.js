const path = require('path')

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'client-src/index.js')},
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
