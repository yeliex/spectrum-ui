import React, { createElement, PropsWithChildren } from 'react';
import { TypographyTextBaseProps } from './typography';
import Style from '@spectrum-css/typography/dist/index-vars.css';
import InnerStyle from './index.less';
import classNames from 'classnames';

export interface TypographyHeadingProps extends TypographyTextBaseProps {
    level: 1 | 2 | 3 | 4 | 5 | 6;
}

const TypographyHeading = (props: PropsWithChildren<TypographyHeadingProps>) => {
    const {
        children,
        level,
        node = `h${level}`,
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
            Style.spectrumHeading,
            `${Style.spectrumHeading}--size${size.toUpperCase()}`,
            // todo: merge color of size and height
            size.endsWith('L') && weight !== 'normal' ?
                `${Style.spectrumHeading}-size${size.toUpperCase()}-${weight}` : undefined,
            {
                [Style.spectrumHeadingSerif]: serif,
                [Style.spectrumHeadingEmphasis]: emphasis,
                [Style.spectrumHeadingStrong]: strong,
                [InnerStyle.spectrumTypographyCenter]: centered,
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

export default TypographyHeading;
