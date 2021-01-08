'use strict';

const webpack = require('webpack');
const minimist = require('minimist');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const args = Object.assign({}, minimist(process.argv), minimist(JSON.parse(process.env.npm_config_argv || '{}').original || ''));

const port = args.p || args.port || '21001';

module.exports = (config = {}) => {
    config.devtool = 'cheap-module-source-map';

    config.plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
    }));

    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    config.plugins.push(new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    }));

    config.output.publicPath = '/';

    config.devServer = {
        compress: false,
        host: '0.0.0.0',
        port,
        hot: true,
        disableHostCheck: true,
        publicPath: '/',
        overlay: {
            warnings: false,
            errors: true,
        },
        watchContentBase: false,
        historyApiFallback: {
            index: '/index.html',
        },
    };

    config.mode = 'development';

    return config;
};
