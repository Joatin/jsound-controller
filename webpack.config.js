var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;
var config = {
    entry: './src/main/index.ts',
    output: {
        path: __dirname + '/dist/main',
        // publicPath: 'http://localhost:${port}/dist/',
        filename: 'main.js',
        // libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            loaders: ['ts-loader'],
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            loader: 'css-loader'
        },
        {
            test: /\.png|\.svg$/,
            loaders: ['file-loader']
        }]
    },
    resolve: {
        extensions: ['', '.js', '.ts', '.html'],
        modulesDirectories: ["node_modules", "bower_components"]
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    plugins: []
};

config.target = webpackTargetElectronRenderer(config);

module.exports = config;