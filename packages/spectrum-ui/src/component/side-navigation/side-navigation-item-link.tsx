import React, { AnchorHTMLAttributes, createElement } from 'react';
import Style from './style';
import { BaseProps } from '../../common/base-component';
import classNames from 'classnames';

export interface SideNavigationItemLinkProps extends BaseProps, AnchorHTMLAttributes<HTMLAnchorElement> {
    // todo: add icon support
    node?: keyof HTMLElementTagNameMap | React.ComponentType | string;
    [key: string]: any;
}

const SideNavigationItem = (props: SideNavigationItemLinkProps) => {
    const {
        children,
        node = 'a',
        className: inputClassName,
        style,
        ...extra
    } = props;

    const className = React.useMemo(() => {
        return classNames(Style.spectrumSideNavItemLink, inputClassName);
    }, [inputClassName]);

    return createElement(node as string, {
        ...extra,
        className,
        style,
    }, children);
};

export default SideNavigationItem;
