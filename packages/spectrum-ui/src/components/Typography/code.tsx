import { useMemo, createElement, PropsWithChildren } from 'react';
import { TypographyTextBaseProps } from './typography';
import classNames from 'classnames';
import './style';

export interface TypographyCodeProps extends TypographyTextBaseProps {
    pre?: boolean;
}

const TypographyCode = (props: PropsWithChildren<TypographyCodeProps>) => {
    const {
        children,
        node = 'code',
        pre,
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
            'spectrum-Code',
            `spectrum-Code--size${size.toUpperCase()}`,
            {
                'spectrum-Code--serif': serif,
                'spectrum-Code-emphasized': emphasis,
                'spectrum-Code-strong': strong,
            },
            inputClassName,
        );
    }, [size, weight, serif, strong, inputClassName, emphasis]);

    const content = createElement(
        node as string,
        {
            className,
            style,
        },
        children,
    );

    if (pre) {
        return (
            <pre>
                {content}
            </pre>
        );
    }

    return content;
};

export default TypographyCode;
