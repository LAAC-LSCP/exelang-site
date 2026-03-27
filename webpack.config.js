const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './themes/elsi-theme/assets/js/main.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'themes', 'elsi-theme', 'assets', 'js'),
  },
};
