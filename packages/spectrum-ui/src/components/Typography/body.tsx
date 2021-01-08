import { useMemo, createElement, PropsWithChildren } from 'react';
import { TypographyTextBaseProps } from './typography';
import classNames from 'classnames';
import './style';

export interface TypographyBodyProps extends TypographyTextBaseProps {
}

const TypographyBody = (props: PropsWithChildren<TypographyBodyProps>) => {
    const {
        children,
        node = 'p',
        size = 'M',
        weight = 'normal',
        serif,
        emphasis,
        strong,
        className: inputClassName,
        style,
    } = props;

    const className = useMemo(() => {
        return classNames(
            'spectrum-Body',
            `spectrum-Body--size${size.toUpperCase()}`,
            {
                'spectrum-Body--serif': serif,
                'spectrum-Body-emphasized': emphasis,
                'spectrum-Body-strong': strong,
            },
            inputClassName,
        );
    }, [size, weight, serif, strong, inputClassName, emphasis]);

    return createElement(
        node as string,
        {
            className,
            style,
        },
        children,
    );
};

export default TypographyBody;
