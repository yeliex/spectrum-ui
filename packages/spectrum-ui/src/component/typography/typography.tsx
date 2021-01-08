import React, { createElement, PropsWithChildren } from 'react';
import { BaseProps } from '../../common/base-component';
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

    return createElement(node as string, {
        className,
        style,
    }, children);
};

Typography.Heading = TypographyHeading;
Typography.Code = TypographyCode;
Typography.Detail = TypographyDetail;
Typography.Body = TypographyBody;

export default Typography;
