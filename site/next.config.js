const { resolve } = require('path');
const withTranspileModules = require('next-transpile-modules');

const COMPONENT_ROOT = resolve(__dirname, '../packages/spectrum-ui/src/components');

/**
 * @type {import('next').NextConfig}
 */
const config = {
    // next.js use join to resolve the path, so we need to use relative path
    distDir: '../.next',
    cleanDistDir: true,
    typescript: {
        tsconfigPath: './tsconfig.json',
    },
    experimental: {},
    poweredByHeader: false,
    env: {
        COMPONENT_ROOT,
    },
    /**
     *
     * @param webpackConfig {import('webpack').Configuration}
     * @returns {*}
     */
    webpack: (webpackConfig) => {
        webpackConfig.module.rules
            .find(({ oneOf }) => !!oneOf).oneOf
            .filter(({ use }) => JSON.stringify(use)?.includes('css-loader'))
            .reduce((acc, { use }) => acc.concat(use), [])
            .forEach(({ options }) => {
                if (options.modules) {
                    options.modules.exportLocalsConvention = 'camelCase';
                }
            });

        webpackConfig.module.unknownContextCritical = false;
        webpackConfig.module.unsafeCache = false;

        webpackConfig.resolve.fallback = webpackConfig.resolve.fallback || {};
        webpackConfig.resolve.fallback['spectrum-ui'] = resolve(__dirname, '../packages/spectrum-ui/src/index.ts');

        return webpackConfig;
    },
};

module.exports = withTranspileModules(
    [
        "spectrum-ui"
    ],
)(config);
