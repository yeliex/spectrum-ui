import React, { AnchorHTMLAttributes, createElement } from 'react';
import Style from '@spectrum-css/sidenav/dist/index-vars.css';
import { BaseProps } from '../../common/base-component';
import classNames from 'classnames';

export interface SideNavigationItemProps extends BaseProps, AnchorHTMLAttributes<HTMLAnchorElement> {
    // todo: add icon support
    icon?: string | React.ReactNode;
    node?: keyof HTMLElementTagNameMap | React.ComponentType | string;
}

const SideNavigationItem = (props: SideNavigationItemProps) => {
    const {
        children,
        node = 'li',
        className: inputClassName,
        style,
    } = props;

    const className = React.useMemo(() => {
        return classNames(Style.spectrumSideNavItem, inputClassName);
    }, [inputClassName]);

    return createElement(node as string, {
        className,
        style,
    }, children);
};

export default SideNavigationItem;
