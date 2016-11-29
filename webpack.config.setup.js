var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BowerWebpackPlugin = require("bower-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

const port = process.env.PORT || 3000;
var config = {
    entry: {
        polyfills: './src/setup-app/polyfills.ts',
        vendor: './src/setup-app/vendor.ts',
        app: './src/setup-app/main.ts',
    },
    output: {
        path: __dirname + '/dist/setup',
        // publicPath: 'http://localhost:${port}/dist/',
        filename: '[name].js',
        // libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts-loader?configFileName=tsconfig.settings.json', 'angular2-template-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.pug$/,
                loader: 'pug'
            },
            {
                test: /\.html$/,
                loaders: ['html']
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            },
            {
                test: /\.png|\.svg$/,
                loaders: ['file-loader']
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.ts', '.html'],
        modulesDirectories: ["node_modules", "bower_components"]
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    plugins: [
        new BowerWebpackPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: [ 'app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/setup-app/index.pug'
        })
    ]
};

config.target = webpackTargetElectronRenderer(config);

module.exports = config;