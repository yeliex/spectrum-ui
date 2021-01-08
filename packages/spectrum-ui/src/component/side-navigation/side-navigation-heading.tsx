import React, { createElement, PropsWithChildren } from 'react';
import Style from './style';
import { BaseProps } from '../../common/base-component';
import classNames from 'classnames';

export interface SideNavigationHeadingProps extends BaseProps {
    node?: keyof HTMLElementTagNameMap | React.ComponentType | string;
}

const SideNavigationHeading = (props: PropsWithChildren<SideNavigationHeadingProps>) => {
    const { children, node = 'li', className: inputClassName, style } = props;

    const className = React.useMemo(() => {
        return classNames(Style.spectrumSideNavHeading, inputClassName);
    }, [inputClassName]);

    return createElement(node as string, {
        className,
        style,
    }, children);
};

export default SideNavigationHeading;
