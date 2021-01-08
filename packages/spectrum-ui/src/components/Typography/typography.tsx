import { useMemo, createElement, PropsWithChildren, ComponentType, ReactHTML, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { BaseProps } from '../../common/base-component';
import TypographyHeading from './heading';
import TypographyCode from './code';
import TypographyBody from './body';
import { TypographyDetail } from './index';
import './style';

export type TypographyTextSize = 'XXXL' | 'XXL' | 'XL' | 'L' | 'M' | 'S' | 'XS' | 'XXS';

export type TypographyTextWeight = 'normal' | 'light' | 'heavy';

export interface TypographyTextBaseProps extends BaseProps {
    node?: keyof HTMLElementTagNameMap | ComponentType | string;
    size?: TypographyTextSize;
    serif?: boolean;
    weight?: TypographyTextWeight;
    emphasis?: boolean;
    strong?: boolean;
}

export interface TypographyProps<T = keyof ReactHTML | ComponentType | string> extends BaseProps, HTMLAttributes<T> {
    node?: T;
}

function Typography(props: PropsWithChildren<TypographyProps<keyof HTMLElementTagNameMap | ComponentType | string>>) {
    const { children, className, style, node = 'div', ...extra } = props;

    const mergedClassName = useMemo(() => {
        return classNames('spectrum-Typography', className);
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
