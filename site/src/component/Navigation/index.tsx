import { SideNavigation, TypographyHeading } from 'spectrum-ui';
import Style from './index.module.scss';
import SiteConfig from '../../lib/load-site';
import Link from 'next/link';

const renderItem = (item: any) => {
    const hasChildren = item.children && item.children.length;

    const content = item.type === 'group' ? (
        <SideNavigation.Heading node="h3">{item.title}</SideNavigation.Heading>
    ) : item.path && item.path.startsWith('http') ? (
        <SideNavigation.ItemLink>
            <a target="_blank" href={item.path}>{item.title}</a>
        </SideNavigation.ItemLink>
    ) : (
        <Link href={item.path}>
            <SideNavigation.ItemLink>
                {item.title}
            </SideNavigation.ItemLink>
        </Link>
    );

    return (
        <SideNavigation.Item key={item.key}>
            {content}
            {
                hasChildren ? (
                    <SideNavigation>
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
                <TypographyHeading level={2}>{SiteConfig.name}</TypographyHeading>
            </a>
            <SideNavigation multiLevel>
                {
                    SiteConfig.menu.map((item: any) => {
                        if (item.key === 'components') {
                            return item.children.map(renderItem);
                        }
                        return (
                            <SideNavigation.Item key={item.key}>
                                <SideNavigation.Heading node="h3">
                                    {item.title}
                                </SideNavigation.Heading>

                                <SideNavigation>
                                    {
                                        item.children.map(renderItem)
                                    }
                                </SideNavigation>
                            </SideNavigation.Item>
                        );
                    })
                }
            </SideNavigation>
        </nav>
    );
};

export default Navigation;
