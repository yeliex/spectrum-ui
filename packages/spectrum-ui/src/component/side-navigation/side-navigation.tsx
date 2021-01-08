import React from 'react';
import Style from '@spectrum-css/sidenav/dist/index-vars.css';
import { BaseProps, decorator } from '../../common/base-component';
import classNames from 'classnames';
import SideNavigationHeading from './side-navigation-heading';
import SideNavigationItem from './side-navigation-item';
import SideNavigationItemLink from './side-navigation-item-link';

export interface SideNavigationProps extends BaseProps {
    multiLevel?: boolean;
    // todo: ConfigProvider support
    disabled?: boolean;
}

const SideNavigation = (props: React.PropsWithChildren<SideNavigationProps>) => {
    const {
        children,
        multiLevel,
        className: inputClassName,
        style,
    } = props;

    const className = React.useMemo(() => {
        return classNames(Style.spectrumSideNav, {
            [Style.spectrumSideNavMultiLevel]: multiLevel,
        }, inputClassName);
    }, [multiLevel]);

    return (
        <ul className={className} style={style}>
            {children}
        </ul>
    );
};

SideNavigation.Item = SideNavigationItem;

SideNavigation.ItemLink = SideNavigationItemLink;

SideNavigation.Heading = SideNavigationHeading;

export default decorator()(SideNavigation);
