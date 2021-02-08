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

export interface TypographyProps<T = keyof React.ReactHTML | React.ComponentType | string> extends BaseProps, React.HTMLAttributes<T> {
    node?: T;
}

function Typography(props: PropsWithChildren<TypographyProps<keyof HTMLElementTagNameMap | React.ComponentType | string>>) {
    const { children, className, style, node = 'div', ...extra } = props;

    const mergedClassName = React.useMemo(() => {
        return classNames(Style.spectrumTypography);
    }, [className]);

    return createElement(node as string, {
        className: mergedClassName,
        style,
        ...extra,
    }, children);
}

Typography.Heading = TypographyHeading;
Typography.Code = TypographyCode;
Typography.Detail = TypographyDetail;
Typography.Body = TypographyBody;

export default Typography;
