import Components, { type IComponentModule } from './load-component';
import { kebabCase } from 'lodash';

const SiteConfig = require('yaml-loader!../site.yml').default;

SiteConfig.pages = SiteConfig.pages || [];

const parseComponentItem = (component: IComponentModule): any => {
    const key = kebabCase(component.key);

    SiteConfig.pages.push({
        path: `/components/${key}`,
        isComponent: true,
        ...component,
    })

    return {
        key: `components/${key}`,
        path: `/components/${key}`,
        title: component.name,
    };
};

const parseComponentGroup = (group: string) => {
    const key = kebabCase(group);

    const list = Components.filter(item => {
        if (key === 'other') {
            return !item.group;
        }
        return item.group && kebabCase(item.group) === key;
    });

    if (!list.length) {
        return {
            key: `components/${kebabCase(group)}`,
            title: group,
            type: 'group',
        };
    }

    return {
        key: `components/${kebabCase(group)}`,
        title: group,
        type: 'group',
        children: list.map((item) => {
            return parseComponentItem(item);
        }),
    };
};

const parseMenuItem = (key: string, item: any, parent: string) => {
    if (parent === 'components') {
        return parseComponentGroup(item);
    }

    SiteConfig.pages.push({
        path: item.path || `/${parent}/${kebabCase(key)}`,
    })

    return {
        key: `${parent}/${kebabCase(key)}`,
        title: key,
        path: item.path || `/${parent}/${kebabCase(key)}`,
    };
};

const parseMenuItems = (list: any, parent: string) => {
    return Object.keys(list).map((key) => {
        return parseMenuItem(key, list[key], parent);
    });
};

SiteConfig.menu = Object.keys(SiteConfig.menu).map((key) => {
    const list = SiteConfig.menu[key];
    const k = key.toLowerCase();
    return {
        key: k,
        title: key,
        children: parseMenuItems(list, k),
    };
});

export default SiteConfig;
