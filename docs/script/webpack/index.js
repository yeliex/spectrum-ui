/**
 * webpack entry
 */

'use strict';

const minimist = require('minimist');

const args = Object.assign({}, minimist(process.argv), minimist(JSON.parse(process.env.npm_config_argv || '{}').original || ''));

let env = process.env.NODE_ENV || 'development';

if (args.prod || args.production) {
    env = 'production';
}

process.env.NODE_ENV = env || 'development';

const BaseConfig = require('./webpack.config.base');

const EnvConfig = env === 'production' ? require('./webpack.config.production') : require('./webpack.config.development');

console.log(`Start build on ${env.toUpperCase()}`);

module.exports = EnvConfig(BaseConfig({}));
