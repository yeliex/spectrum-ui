import * as yaml from 'yaml';
import { camelCase, upperFirst } from 'lodash';

interface IExampleMeta {
    name: string;
    description?: string;
}

export interface IComponentMeta {
    name: string;
    parent?: string;
    group?: string;
    description?: string;
    example?: Record<string, IExampleMeta>;
}

export default function parseMeta(name: string, input: string) {
    const content: IComponentMeta = yaml.parse(input);

    if (!content.name) {
        content.name = upperFirst(camelCase(name));
    }

    const { example: examples = {} } = content;

    Object.keys(examples).forEach((exampleName) => {
        const example = examples[exampleName];

        if (typeof example !== 'object') {
            examples[exampleName] = {
                name: example,
            };
        }
    });

    return content;
}
