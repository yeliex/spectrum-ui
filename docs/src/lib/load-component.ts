import React from 'react';
import { basename, dirname, extname, resolve } from 'path';
import * as Debug from 'debug';
import { upperFirst, camelCase } from 'lodash';
import parseMeta, { IComponentMeta } from './parse-meta';

const debug = Debug('app:load-component');

const modules = require.context(process.env.COMPONENT_ROOT!, true, /((index\.tsx?)|(\.(ya?ml|md))$)|example/);

const COMPONENT_NAME_REGEX = /^\.\/([a-z-_]+)/i;

const META_INTL_REGEX = /^meta-([a-z-_]+)$/i;

interface IComponentExample {
    component: React.ReactElement;
    source: string;
    file: string;
}

export interface IComponentModule {
    component: React.Component;
    example: Record<string, IComponentExample>;
    meta: IComponentMeta & Partial<{
        [key: string]: Partial<IComponentMeta>;
    }>;
}

const components = modules.keys().reduce<Record<string, IComponentModule>>((total, file) => {
    const componentName = (COMPONENT_NAME_REGEX.exec(file) || [])[1];

    if (!componentName) {
        debug(`cannot parse component name: ${file}`);
        return total;
    }
    const component = total[componentName] = total[componentName] || {
        file: `/${componentName}/${componentName}.tsx`,
    };

    const ext = extname(file);

    if (!ext) {
        return total;
    }

    const filename = basename(file);

    if (filename === 'index.tsx') {
        component.component = modules(file).default;
        return total;
    }

    const base = basename(filename, ext);

    if (base === 'meta' || base.match(META_INTL_REGEX)) {
        const meta = component.meta = component.meta || {};

        const intlMatch = base.match(META_INTL_REGEX);
        if (!intlMatch || !intlMatch[1]) {
            component.meta = {
                ...meta,
                ...parseMeta(componentName, modules(file).default) as any,
            };
        } else {
            meta[intlMatch[1]] = parseMeta(componentName, modules(file).default);
        }

        return total;
    }

    const dir = basename(dirname(file));

    if (dir === 'example') {
        const example = component.example = component.example || {};

        const code = require(`!!raw-loader!${process.env.COMPONENT_ROOT!}${resolve(file)}`).default;

        example[base] = {
            component: modules(file).default,
            source: code,
            file: resolve(file),
        };

        return total;
    }

    return total;
}, {});

Object.keys(components).forEach((key) => {
    const component = components[key];

    if (!component.meta) {
        component.meta = {
            name: upperFirst(camelCase(key)),
            group: 'Other',
            example: {},
        } as any;
    }
    if (!component.example) {
        component.example = {};
    }
});

export default components;
