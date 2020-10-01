const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'app.bundle.js',
    path: path.join(__dirname, 'dist'),
    chunkFilename: '[name].bundle.js',
    publicPath: './',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.bundle\.js$/,
        use: 'bundle-loader',
      },
      // { enforce: 'pre', test: /\.(js|ts)$/, loader: 'eslint-loader' },
      {
        test: /\.(js|ts)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/react'],
          },
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(otf|png|gif|ttf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        loader: '@svgr/webpack',
      },
    ],
  },
  devServer: {
    hot: true,
    publicPath: '/',
    contentBase: path.join(__dirname, '/dist'), // serve your static files from here
    watchContentBase: true, // initiate a page refresh if static content changes
    proxy: [
      // allows redirect of requests to webpack-dev-server to another destination
      {
        context: ['/api'], // can have multiple
        target: 'http://localhost:3030', // server and port to redirect to
        secure: false,
      },
    ],
    port: 8080, // port webpack-dev-server listens to, defaults to 8080
    overlay: {
      // Shows a full-screen overlay in the browser when there are compiler errors or warnings
      warnings: false, // defaults to false
      errors: false, // defaults to false
    },
  },
  plugins: HtmlWebpackPluginTemplates(['index']),
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};

function HtmlWebpackPluginTemplates(htmlPages) {
  return htmlPages.map(
    (name) =>
      new HtmlWebpackPlugin({
        filename: name + '.html',
        template: `public/${name}.html`,
      })
  );
}
