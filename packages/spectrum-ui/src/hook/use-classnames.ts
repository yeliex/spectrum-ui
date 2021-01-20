import React from 'react';
import classNames from 'classnames';
import { ComponentStatusProps, InputComponentStatusProps } from './config-context';
import useConfig from './use-config';

const useClassNames = <T>(factory: () => T, props: Partial<ComponentStatusProps & InputComponentStatusProps>, deps: React.DependencyList) => {
    const className = React.useMemo(factory, deps);

    const { themeConfig, scale: outerScale, theme: outerTheme } = useConfig();

    const {
        disabled,
        scale: inputScale,
        theme: inputTheme,
    } = props;

    const scale = inputScale !== outerScale ? inputScale : undefined;
    const theme = inputTheme !== outerTheme ? inputTheme : undefined;

    const scaleTheme = scale ? themeConfig[scale] || {} : {};
    const colorTheme = theme ? themeConfig[theme] || {} : {};

    return React.useMemo(() => {
        return classNames(
            scaleTheme[Object.keys(scaleTheme)[0]],
            colorTheme[Object.keys(colorTheme)[0]],
            className, {
                'is-disabled': disabled,
            },
        );
    }, [
        className,
        disabled,
        scaleTheme,
        colorTheme,
    ]);
};

export default useClassNames;
