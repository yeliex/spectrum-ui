'use strict';

const webpack = require('webpack');
const { resolve } = require('path');
const _ = require('lodash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entries = require('./webpack.entries');
const babelOptions = require('./babel.config');
const webpackEnv = require('./webpack.env');

const CWD = process.cwd();

const postcssOptions = {
    sourceMap: true,
    plugins: [
        ['rucksack-css'],
        ['autoprefixer'],
    ],
};

const htmlEntries = Object.keys(entries).reduce((total, key) => {
    const entry = entries[key];
    const file = entry.filter((f) => f && f.match(/\.html$/))[0];
    if (!file) {
        return total;
    }
    total[key] = resolve(CWD, file);
    return total;
}, {});

module.exports = (config = {}) => {
    config.entry = Object.keys(entries).reduce((total, key) => {
        const entry = (entries[key] instanceof Array ? entries[key] : [entries[key]]).filter((file) => {
            return !file.match(/\.html$/);
        });
        entry.unshift(require.resolve('regenerator-runtime'));

        total[key] = entry;
        return total;
    }, {});

    config.output = {
        path: resolve(CWD, 'dist'),
        filename: '[name].js',
        chunkFilename: 'chunk/[id]-[name].js',
        publicPath: '/',
        crossOriginLoading: 'anonymous',
    };

    config.devtool = '#source-map';

    config.resolve = {
        modules: [
            'node_modules',
        ],
        mainFiles: ['index.tsx', 'index.ts', 'index.js', 'index.less', 'index.css'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.less', '*.css', '*.yml', '*.md'],
        mainFields: ['source', 'module', 'browser', 'main'],
    };

    config.module = {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: babelOptions,
                    },
                    {
                        loader: require.resolve('ts-loader'),
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: babelOptions,
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            sourceMap: true,
                            modules: {
                                mode: 'global',
                                exportGlobals: true,
                                exportLocalsConvention: 'camelCaseOnly',
                            },
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: { postcssOptions },
                    },
                ],
            },
            {
                test: /\.less$/,
                include: [/node_modules/, /packages\/spectrum-ui/],
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            sourceMap: true,
                            modules: {
                                localIdentName: '[local]',
                                exportLocalsConvention: 'camelCaseOnly',
                            },
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: { postcssOptions },
                    },
                    {
                        loader: require.resolve('less-loader'),
                        options: {
                            sourceMap: true,
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                exclude: [/node_modules/, /packages\/spectrum-ui/],
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            sourceMap: true,
                            modules: {
                                localIdentName: '[local]___[hash:base64:5]',
                                exportLocalsConvention: 'camelCaseOnly',
                            },
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: { postcssOptions },
                    },
                    {
                        loader: require.resolve('less-loader'),
                        options: {
                            sourceMap: true,
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif)(\?.*)?$/,
                use: [
                    {
                        loader: require.resolve('url-loader'),
                        options: {
                            fallback: 'file-loader',
                            limit: 8192,
                            outputPath: 'assets',
                            name: '[name]-[hash].[ext]',
                            emitFile: true,
                        },
                    },
                ],
            },
            {
                test: /\.(swf|woff|woff2|ttf|svg|otf)(\?.*)?$/,
                use: `${require.resolve('url-loader')}?limit=10000`,
            },
            {
                test: /\.eot(\?.*)?$/,
                use: require.resolve('url-loader'),
            },
            {
                test: /\.y(a?)ml(\?.*)?$/,
                use: require.resolve('raw-loader'),
            },
        ],
    };

    config.plugins = [
        new webpack.WatchIgnorePlugin([/less\.d\.ts$/]),
        new CaseSensitivePathsPlugin(),
        new webpack.DefinePlugin({
            'process.env.VERSION': JSON.stringify(process.env.npm_package_version),
            ...Object.keys(webpackEnv).reduce((total, key) => {
                total[`process.env.${key}`] = JSON.stringify(webpackEnv[key]);
                return total;
            }, {}),
        }),
    ];

    Object.keys(htmlEntries).forEach((key) => {
        config.plugins.push(new HtmlWebpackPlugin({
            inject: 'body',
            filename: `${key}.html`,
            template: htmlEntries[key],
            hash: true,
            cache: true,
        }));
    });

    config.optimization = {
        splitChunks: {
            chunks: 'async',
            name: true,
        },
    };

    config.stats = {
        assets: true,
        colors: true,
        cached: true,
        chunks: false,
        children: false,
        errors: true,
        modules: false,
        reasons: false,
        source: false,
        timings: true,
        warnings: true,
        version: true,
    };

    config.target = 'web';

    config.recordsPath = resolve(config.output.path, 'records.json');

    return config;
};
