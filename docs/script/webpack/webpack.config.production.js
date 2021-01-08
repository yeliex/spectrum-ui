'use strict';

const webpack = require('webpack');
const minimist = require('minimist');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const moment = require('moment');

const args = Object.assign({}, minimist(process.argv), minimist(JSON.parse(process.env.npm_config_argv || '{}').original || ''));

module.exports = (config) => {
    throw new Error('not support');
};
