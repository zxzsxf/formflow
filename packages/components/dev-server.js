const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');

const compiler = webpack(config);
const devServerOptions = config.devServer || {};

const server = new WebpackDevServer(devServerOptions, compiler);

server.start(); 