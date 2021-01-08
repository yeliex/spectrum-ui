import { useMemo, createElement, PropsWithChildren } from 'react';
import { TypographyTextBaseProps } from './typography';
import classNames from 'classnames';
import './style';

export interface TypographyDetailProps extends TypographyTextBaseProps {
}

const TypographyDetail = (props: PropsWithChildren<TypographyDetailProps>) => {
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
            'spectrum-Detail',
            `spectrum-Detail--size${size.toUpperCase()}`,
            {
                'spectrum-Detail--serif': serif,
                'spectrum-Detail-emphasized': emphasis,
                'spectrum-Detail-strong': strong,
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

export default TypographyDetail;
