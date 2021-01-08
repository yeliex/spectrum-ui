import { extname, basename } from 'path';
import { ThemeConfig } from '../../hook/config-context';

const context = require.context('@spectrum-css/vars/dist', false, /\.css$/);

const THEME_NAME_REGEX = /^spectrum-(.*)$/;

const DEFAULT_THEME = context.keys().reduce<ThemeConfig>((total, file) => {
    const name = basename(file, extname(file));

    const themeName = THEME_NAME_REGEX.exec(name);

    if (!themeName) {
        return total;
    }
    total[themeName[1] as keyof ThemeConfig] = context(file).default;

    return total;
}, {});

export default DEFAULT_THEME;
