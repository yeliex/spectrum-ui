import React, { createElement, PropsWithChildren } from 'react';
import { TypographyTextBaseProps } from './typography';
import Style from './style';
import classNames from 'classnames';

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
        centered,
    } = props;

    const className = React.useMemo(() => {
        return classNames(
            Style.spectrumCode,
            `${Style.spectrumCode}--size${size.toUpperCase()}`,
            {
                [Style.spectrumCodeSerif]: serif,
                [Style.spectrumCodeEmphasis]: emphasis,
                [Style.spectrumCodeStrong]: strong,
                [Style.spectrumTypographyCenter]: centered,
            },
            inputClassName,
        );
    }, [size, weight, serif, strong, centered, inputClassName, emphasis]);

    const content = createElement(node as string,
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
