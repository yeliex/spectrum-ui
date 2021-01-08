'use strict';

const webpack = require('webpack');
const minimist = require('minimist');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackExternalPlugin= require('webpack-external-plugin');

const args = Object.assign({}, minimist(process.argv), minimist(JSON.parse(process.env.npm_config_argv || '{}').original || ''));

module.exports = (config) => {
    config.output.filename = '[name]-[chunkhash].js';
    config.output.chunkFilename = 'chunk/[chunkhash].js';

    config.plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.BUILD_COMMIT': JSON.stringify((process.env.GIT_COMMIT || '').slice(0, 6)),
    }));

    config.plugins.push(
        new WebpackExternalPlugin({
            filename: 'load-[name]-[hash].js',
        }),
    );

    config.optimization = {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                cache: true,
                sourceMap: true,
                parallel: true,
                terserOptions: {
                    sourceMap: true,
                    mangle: true,
                    keep_fnames: false,
                    keep_classnames: true,
                    output: {
                        beautify: false,
                        comments: false,
                    },
                    compress: {
                        drop_console: true,
                        collapse_vars: true,
                        reduce_vars: true,
                        drop_debugger: true,
                    },
                },
            }),
            new OptimizeCSSAssetsPlugin(),
        ],
    };

    config.plugins.push(new MiniCssExtractPlugin({
        filename: '[name]-[chunkhash].css',
        chunkFilename: 'chunk/[chunkhash].css',
    }));

    if (args.analyze) {
        config.plugins.push(new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
        }));
    }

    config.mode = 'production';

    return config;
};
