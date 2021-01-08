import React, { createElement, PropsWithChildren } from 'react';
import { TypographyTextBaseProps } from './typography';
import Style from '@spectrum-css/typography/dist/index-vars.css';
import InnerStyle from './index.less';
import classNames from 'classnames';

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
        centered,
    } = props;

    const className = React.useMemo(() => {
        return classNames(
            Style.spectrumDetail,
            `${Style.spectrumDetail}--size${size.toUpperCase()}`,
            {
                [Style.spectrumDetailSerif]: serif,
                [Style.spectrumDetailEmphasis]: emphasis,
                [Style.spectrumDetailStrong]: strong,
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

export default TypographyDetail;
