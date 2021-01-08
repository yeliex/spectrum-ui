import React from 'react';
import { SideNavigation, TypographyHeading } from 'spectrum-ui';
import Style from './index.less';
import SiteConfig from '../../lib/load-site';
import { Link } from 'react-router-dom';

const renderItem = (item: any) => {
    const hasChildren = item.children && item.children.length;

    const content = item.type === 'group' ? (
        <SideNavigation.Heading node="h4">{item.title}</SideNavigation.Heading>
    ) : item.path && item.path.startsWith('http') ? (
        <SideNavigation.ItemLink target="_blank" href={item.path}>
            {item.title}
        </SideNavigation.ItemLink>
    ) : (
        <SideNavigation.ItemLink node={Link as any} to={item.path}>
            {item.title}
        </SideNavigation.ItemLink>
    );

    return (
        <SideNavigation.Item key={item.key}>
            {content}
            {
                hasChildren ? (
                    <SideNavigation multiLevel>
                        {item.children.map(renderItem)}
                    </SideNavigation>
                ) : null
            }
        </SideNavigation.Item>
    );
};

const Navigation = () => {
    return (
        <nav className={Style.navigation}>
            <a className={Style.logo} href="/">
                <TypographyHeading centered level={2}>{SiteConfig.name}</TypographyHeading>
            </a>
            {
                SiteConfig.menu.map((item: any) => {
                    return (
                        <SideNavigation key={item.key}>
                            <SideNavigation.Heading node="h3">{item.title}</SideNavigation.Heading>
                            {
                                item.children.map(renderItem)
                            }
                        </SideNavigation>
                    );
                })
            }
        </nav>
    );
};

export default Navigation;
