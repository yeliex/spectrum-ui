const { resolve } = require('path');

// todo: 通过配置文件获取相对路径 不使用require.resolve以避免npm里面的是打包以后的版本丢失元信息
exports.PACKAGE_ROOT = resolve(__dirname, '../../../packages/spectrum-ui');
exports.COMPONENT_ROOT = resolve(exports.PACKAGE_ROOT, 'src/component/');
