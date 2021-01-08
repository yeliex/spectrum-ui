import React, { createElement, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { BaseProps } from '../../common/base-component';
import Style from './style';
import TypographyHeading from './heading';
import TypographyCode from './code';
import TypographyBody from './body';
import { TypographyDetail } from './index';

export type TypographyTextSize = 'XXXL' | 'XXL' | 'XL' | 'L' | 'M' | 'S' | 'XS' | 'XXS';

export type TypographyTextWeight = 'normal' | 'light' | 'heavy';

export interface TypographyTextBaseProps extends BaseProps {
    node?: keyof HTMLElementTagNameMap | React.ComponentType | string;
    size?: TypographyTextSize;
    serif?: boolean;
    weight?: TypographyTextWeight;
    emphasis?: boolean;
    strong?: boolean;
    centered?: boolean;
}

export interface TypographyProps extends BaseProps {
    node?: keyof HTMLElementTagNameMap | React.ComponentType | string;
}

const Typography = (props: PropsWithChildren<TypographyProps>) => {
    const { children, className, style, node = 'div' } = props;

    const mergedClassName = React.useMemo(()=>{
        return classNames(Style.spectrumTypography)
    }, [className])

    return createElement(node as string, {
        className: mergedClassName,
        style,
    }, children);
};

Typography.Heading = TypographyHeading;
Typography.Code = TypographyCode;
Typography.Detail = TypographyDetail;
Typography.Body = TypographyBody;

export default Typography;
