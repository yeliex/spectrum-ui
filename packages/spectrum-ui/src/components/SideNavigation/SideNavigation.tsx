import * as React from 'react';
import { BaseProps } from '../../common/base-component';
import classNames from 'classnames';
import SideNavigationHeading from './SideNavigationHeading';
import SideNavigationItem from './SideNavigationItem';
import SideNavigationItemLink from './SideNavigationItemLink';
import './style';

export interface SideNavigationProps extends BaseProps {
    multiLevel?: boolean;
}

const SideNavigation = (props: React.PropsWithChildren<SideNavigationProps>) => {
    const {
        children,
        multiLevel,
        className: inputClassName,
        style,
    } = props;

    const className = React.useMemo(() => {
        return classNames('spectrum-SideNav', {
            'spectrum-SideNav--multiLevel': multiLevel,
        }, inputClassName);
    }, [multiLevel, inputClassName]);

    return (
        <ul className={className} style={style}>
            {children}
        </ul>
    );
};

SideNavigation.Item = SideNavigationItem;

SideNavigation.ItemLink = SideNavigationItemLink;

SideNavigation.Heading = SideNavigationHeading;

export default SideNavigation;
