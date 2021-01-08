import React, { createElement, PropsWithChildren } from 'react';
import { TypographyTextBaseProps } from './typography';
import Style from './style';
import classNames from 'classnames';

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
        centered,
    } = props;

    const className = React.useMemo(() => {
        return classNames(
            Style.spectrumBody,
            `${Style.spectrumBody}--size${size.toUpperCase()}`,
            {
                [Style.spectrumBodySerif]: serif,
                [Style.spectrumBodyEmphasis]: emphasis,
                [Style.spectrumBodyStrong]: strong,
                [Style.spectrumTypographyCenter]: centered,
            },
            inputClassName,
        );
    }, [size, weight, serif, strong, centered, inputClassName, emphasis]);

    return createElement(node as string,
        {
            className,
            style,
        },
        children,
    );
};

export default TypographyBody;
