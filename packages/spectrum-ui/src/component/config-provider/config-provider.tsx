import React from 'react';
import ConfigContext, { ConfigContextProps, Scale, Theme } from '../../hook/config-context';
import { defaults } from 'lodash';
import useConfig from '../../hook/use-config';
import DEFAULT_THEME from './default-theme';
import View from '../view';

export interface ConfigProviderProps extends Partial<ConfigContextProps> {
    defaultTheme?: Theme;
    defaultScale?: Scale;
    withView?: boolean;
}

const ConfigProvider: React.FC<Partial<ConfigProviderProps>> = (props) => {
    const {
        theme,
        themeConfig,
        scale,
        disabled,
        emphasized,
        quiet,
        readOnly,
        required,
        defaultScale,
        defaultTheme,
        withView,
    } = props;

    let { children } = props;

    const outerConfig = useConfig();

    const renderView = withView || (!('withView' in props) && !outerConfig);

    const config: ConfigContextProps = React.useMemo(() => {
        return defaults({
            theme,
            themeConfig,
            scale,
            disabled,
            emphasized,
            quiet,
            readOnly,
            required,
        }, {
            theme: defaultTheme,
            scale: defaultScale,
        }, outerConfig, {
            disabled: false,
            emphasized: false,
            quiet: false,
            readOnly: false,
            required: false,
            themeConfig: DEFAULT_THEME,
        }) as any;
    }, [theme, themeConfig, scale, disabled, emphasized, quiet, readOnly, required, outerConfig]);

    if (renderView) {
        children = (
            <View>
                {children}
            </View>
        );
    }

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
};

export default ConfigProvider;
