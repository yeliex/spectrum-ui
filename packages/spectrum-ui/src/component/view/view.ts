import React from 'react';
import { BaseProps } from '../../common/base-component';
import { ComponentStatusProps, ThemeConfig } from '../../hook/config-context';
import classNames from 'classnames';
import { uniq, defaults, defaultsDeep } from 'lodash';
import useConfig from '../../hook/use-config';
import { DEFAULT_THEME } from '../config-provider';
import TypographyStyle from '@spectrum-css/typography/dist/index-vars.css';

export interface ViewProps extends BaseProps, Partial<Pick<ComponentStatusProps, 'scale' | 'theme'>> {
    themeConfig?: ThemeConfig;
    node?: keyof HTMLElementTagNameMap | React.ComponentType;
}

const View = (props: React.PropsWithChildren<ViewProps>) => {
    const {
        node = 'div',
        children,
        className: inputClassName,
        style: inputStyle,
        themeConfig: inputThemeConfig,
        theme: inputTheme,
        scale: inputScale,
    } = props;

    const outerConfig = useConfig();

    const [className, style] = React.useMemo(() => {
        const config = defaults({
            themeConfig: inputThemeConfig,
            theme: inputTheme,
            scale: inputScale,
        }, outerConfig || {}, {
            themeConfig: DEFAULT_THEME,
            theme: 'light',
            scale: 'medium',
        });

        config.themeConfig = config.themeConfig === DEFAULT_THEME ?
            config.themeConfig :
            defaultsDeep(config.themeConfig, DEFAULT_THEME);

        const { global = {} } = config.themeConfig;

        const scaleTheme = config.themeConfig[config.scale] || {};

        const colorTheme = config.themeConfig[config.theme] || {};

        return [
            uniq(classNames(
                global.spectrum,
                TypographyStyle.spectrum,
                scaleTheme[Object.keys(scaleTheme)[0]],
                colorTheme[Object.keys(colorTheme)[0]],
                inputClassName,
            ).split(' ')).join(' '),
            {
                isolation: 'isolate',
                colorScheme: config.theme.includes('dark') ? 'dark' : 'light',
                ...inputStyle,
            },
        ];
    }, [inputScale, inputTheme, inputThemeConfig, inputClassName, inputStyle, outerConfig]);

    return React.createElement(node as string, {
        style,
        className,
    }, children);
};

export default View;
