import * as React from 'react';
import useConfig from '../../hook/use-config';
import { ConfigProvider } from '../../components/ConfigProvider';
import { defaults, omit } from 'lodash';

export interface BaseProps {
    className?: string;
    style?: React.CSSProperties;
}

export const decorator = () => {
    return <T extends React.ComponentType>(Component: T): T => {
        const decoratedComponent: any = (props: any) => {
            const outerConfig = useConfig();

            const mergedProps = React.useMemo(() => {
                return defaults(props, omit(outerConfig, 'themeConfig'));
            }, [outerConfig, props]);

            const element = React.createElement(Component, mergedProps);

            if (!outerConfig) {
                return React.createElement(ConfigProvider, {}, element);
            }

            return element;
        };

        decoratedComponent.displayName = `Decorated(${Component.displayName || Component.name})`;

        if (typeof Component === 'function') {
            const keys = Object.keys(Component);
            keys.forEach((key) => {
                decoratedComponent[key] = (Component as any)[key];
            });
        }

        return decoratedComponent;
    };
};
