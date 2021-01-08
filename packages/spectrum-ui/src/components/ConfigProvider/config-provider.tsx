import { useMemo, type PropsWithChildren } from 'react';
import ConfigContext, { type ConfigContextProps } from '../../hook/config-context';
import { defaults } from 'lodash';
import useConfig from '../../hook/use-config';

export type ConfigProviderProps = Partial<ConfigContextProps>;

const ConfigProvider = (props: PropsWithChildren<ConfigProviderProps>) => {
    const {
        theme,
        scale,
        disabled,
        emphasized,
        quiet,
        readOnly,
        required,
    } = props;

    let { children } = props;

    const outerConfig = useConfig();

    const config: ConfigContextProps = useMemo(() => {
        return defaults({
            theme,
            scale,
            disabled,
            emphasized,
            quiet,
            readOnly,
            required,
        }, outerConfig, {
            disabled: false,
            emphasized: false,
            quiet: false,
            readOnly: false,
            required: false,
        }) as any;
    }, [theme, scale, disabled, emphasized, quiet, readOnly, required, outerConfig]);

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
};

export default ConfigProvider;
