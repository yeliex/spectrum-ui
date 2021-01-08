import * as React from 'react';
import classNames from 'classnames';
import { ComponentStatusProps, InputComponentStatusProps } from './config-context';
import useConfig from './use-config';

const useClassNames = <T>(
    factory: () => T,
    props: Partial<ComponentStatusProps & InputComponentStatusProps>,
    deps: React.DependencyList,
) => {
    const className = React.useMemo(factory, deps);

    const { scale: outerScale, theme: outerTheme } = useConfig();

    const {
        disabled,
        scale: inputScale,
        theme: inputTheme,
    } = props;

    const scale = inputScale !== outerScale ? inputScale : undefined;
    const theme = inputTheme !== outerTheme ? inputTheme : undefined;

    return React.useMemo(() => {
        return classNames(
            scale ? `spectrum-${scale}` : undefined,
            theme ? `spectrum-${theme}` : undefined,
            className, {
                'is-disabled': disabled,
            },
        );
    }, [
        className,
        disabled,
        scale,
        theme,
    ]);
};

export default useClassNames;
