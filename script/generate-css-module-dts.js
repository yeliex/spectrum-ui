const Path = require('path');
const Fs = require('fs');
const Glob = require('glob');
const postcss = require('postcss');
const postcssModules = require('postcss-modules');
const Debug = require('debug');

const debug = Debug('spectrum-ui:dts-generator');
debug.enabled = true;
debug('start generate dts for @spectrum-css');

const SPECTRUM_CWD = Path.resolve(require.resolve('@spectrum-css/vars'), '../../..');

const SPECTRUM_TARGET = Path.resolve(__dirname, '../types/spectrum-css/index.d.ts');

if (Fs.existsSync(SPECTRUM_TARGET)) {
    Fs.rmSync(SPECTRUM_TARGET);
}

const files = Glob.sync('*/dist/*.css', {
    cwd: SPECTRUM_CWD,
    absolute: true,
});

const CONTENT = {};

const process = postcss([
    postcssModules({
        localsConvention: 'camelCaseOnly',
        exportGlobals: true,
        generateScopedName: '[local]',
        getJSON: (cssFileName, json, outputFileName) => {
            const modulePath = Path.resolve(SPECTRUM_CWD, Path.relative(SPECTRUM_CWD, cssFileName).split('/')[0]);
            const packageJSON = require(Path.resolve(modulePath, 'package.json'));
            const packageName = packageJSON.name;
            const relativePath = Path.relative(modulePath, cssFileName);

            const exportName = Path.join(packageName, relativePath);
            Fs.appendFileSync(SPECTRUM_TARGET, jsonToDTS(exportName, json));

            if (cssFileName === require.resolve(packageName)) {
                Fs.appendFileSync(SPECTRUM_TARGET, genMainExport(exportName, packageName));
            }
        },
    }),
]);

(async () => {
    for (const filepath of files) {
        const relativePath = Path.relative(Path.resolve(SPECTRUM_CWD, '../'), filepath);
        debug(`[PROCESS] ${relativePath}`);
        await process.process(Fs.readFileSync(filepath), { from: filepath });
        debug(`[DONE]`);
    }

    debug(`[GENERATE DONE]`);
})();

function jsonToDTS(name, json) {
    return `declare module '${name}' {
    interface Style {
        ${Object.keys(json).map(k=>`${k}: string;`).join('\n        ')}
    }

    const content: Style;

    export default content;
}

`;
}

function genMainExport(from, to) {
    return `declare module '${to}' {
    export { default } from '${from}';
}

`;
}
