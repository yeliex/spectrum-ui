import Component, { IComponentModule } from './load-component';
import site from '../site.yml';
import { parse } from 'yaml';
import { kebabCase } from 'lodash';

const SiteConfig = parse(site);

const ComponentList = Object.keys(Component);

const parseComponentItem = (name: string, component: IComponentModule): any => {
    const key = kebabCase(name);
    const data = {
        key: `component/${key}`,
        path: `/component/${key}`,
        title: component.meta.name,
    };

    const children = ComponentList.filter(k => {
        const item = Component[k];
        return item.meta.parent && kebabCase(item.meta.parent) === key;
    });

    if (!children.length) {
        return data;
    }

    return {
        ...data,
        children: children.map((key) => {
            return parseComponentItem(key, Component[key]);
        }),
    };
};

const parseComponentGroup = (group: string) => {
    const key = kebabCase(group);

    const list = ComponentList.filter(k => {
        const item = Component[k];
        return item.meta.group && kebabCase(item.meta.group) === key;
    });

    if (!list.length) {
        return {
            key: `component/${kebabCase(group)}`,
            title: group,
            type: 'group',
        };
    }

    return {
        key: `component/${kebabCase(group)}`,
        title: group,
        type: 'group',
        children: list.map((key) => {
            return parseComponentItem(key, Component[key]);
        }),
    };
};

const parseMenuItem = (key: string, item: any, parent: string) => {
    if (parent === 'component') {
        return parseComponentGroup(item);
    }
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
