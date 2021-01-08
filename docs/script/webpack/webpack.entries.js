'use strict';

const path = require('path');

const CWD = path.resolve(__dirname, '../../');
const ROOT = path.resolve(CWD, 'src');

module.exports = {
    index: [
        path.resolve(ROOT, 'index.tsx'),
        path.resolve(ROOT, 'index.html'),
    ],
};
