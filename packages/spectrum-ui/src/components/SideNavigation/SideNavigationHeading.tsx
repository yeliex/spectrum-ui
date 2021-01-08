import { useMemo, createElement, ComponentType, PropsWithChildren } from 'react';
import { BaseProps } from '../../common/base-component';
import classNames from 'classnames';
import './style';

export interface SideNavigationHeadingProps extends BaseProps {
    node?: keyof HTMLElementTagNameMap | ComponentType | string;
}

const SideNavigationHeading = (props: PropsWithChildren<SideNavigationHeadingProps>) => {
    const { children, node = 'li', className: inputClassName, style, ...extra } = props;

    const className = useMemo(() => {
        return classNames('spectrum-SideNav-heading', inputClassName);
    }, [inputClassName]);

    return createElement(node as string, {
        className,
        style,
        ...extra,
    }, children);
};

export default SideNavigationHeading;
