import * as React from 'react';
import { basename, dirname, extname } from 'path';
import { upperFirst, camelCase, kebabCase } from 'lodash';
import { parse } from 'yaml';

const componentModules = require.context(process.env.COMPONENT_ROOT!, true, /index.tsx?$/);

const exampleCodeModules = require.context(
    `!!raw-loader!${process.env.COMPONENT_ROOT}`,
    true,
    /examples\/[a-z]+\.tsx$/i,
    'lazy-once',
);

const exampleModules = require.context(
    process.env.COMPONENT_ROOT!,
    true,
    /examples\/[a-z]+\.tsx$/i,
    'lazy-once',
);

const metaModules = require.context(`raw-loader!${process.env.COMPONENT_ROOT}`, true, /meta\/[a-z-]+.(ya?ml|md)$/i);

export interface IComponentExample {
    component: () => Promise<React.ReactElement>;
    source: () => Promise<string>;
    key: string;
    title: string;
    description: string;
}

export interface IComponentIntlMeta {
    title: string;
    description: string;
    examples: Record<string, {
        title: string;
        description: string;
    }>;
}

export interface IComponentModule {
    key: string;
    name: string;
    group?: string;
    description?: string;
    examples: IComponentExample[];
    intl: Record<string, IComponentIntlMeta>;
}

const Components: IComponentModule[] = [];

componentModules.keys().forEach((path: string) => {
    const baseDir = dirname(path);
    const componentName = upperFirst(camelCase(basename(baseDir)));

    const data: IComponentModule = {
        key: kebabCase(componentName),
        name: componentName,
        examples: [],
        intl: {},
    };

    Components.push(data);

    metaModules.keys().forEach((path) => {
        if (!path.startsWith(`${baseDir}/meta`)) {
            return;
        }

        const name = basename(path, extname(path));

        const content = parse(metaModules(path).default);

        if (name === 'base') {
            data.group = content.group;
            data.name = content.name;
            data.description = content.description;
            data.examples = content.examples;
        } else {
            data.intl[name] = content;
        }
    });

    exampleModules.keys().forEach((path) => {
        if (!path.startsWith(`${baseDir}/examples`)) {
            return;
        }

        const key = basename(path, extname(path));
        const component = () => exampleModules(path);

        let example = data.examples.find(item => item.key === key)!;
        if (!example) {
            example = {
                key,
                title: key,
            } as any;
            data.examples.push(example!);
        }
        example.component = component;
        example.source = () => exampleCodeModules(path);
    });
});

export default Components;
