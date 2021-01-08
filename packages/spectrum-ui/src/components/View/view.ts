import { useMemo, createElement, type ComponentType, type PropsWithChildren } from 'react';
import { BaseProps } from '../../common/base-component';
import { ComponentStatusProps } from '../../hook/config-context';
import classNames from 'classnames';
import { uniq, defaults } from 'lodash';
import useConfig from '../../hook/use-config';

export interface ViewProps extends BaseProps, Partial<Pick<ComponentStatusProps, 'scale' | 'theme'>> {
    node?: keyof HTMLElementTagNameMap | ComponentType;
}

const View = (props: PropsWithChildren<ViewProps>) => {
    const {
        node = 'div',
        children,
        className: inputClassName,
        style: inputStyle,
        theme: inputTheme,
        scale: inputScale,
    } = props;

    const outerConfig = useConfig();

    const [className, style] = useMemo(() => {
        const config = defaults({
            theme: inputTheme,
            scale: inputScale,
        }, outerConfig || {}, {
            theme: 'light',
            scale: 'medium',
        });

        return [
            uniq(classNames(
                'spectrum',
                `spectrum-${inputTheme}`,
                `spectrum-${inputScale}`,
                inputClassName,
            ).split(' ')).join(' '),
            {
                isolation: 'isolate',
                colorScheme: config.theme.includes('dark') ? 'dark' : 'light',
                ...inputStyle,
            },
        ];
    }, [inputScale, inputTheme, inputClassName, inputStyle, outerConfig]);

    return createElement(node as string, {
        style,
        className,
    }, children);
};

export default View;
