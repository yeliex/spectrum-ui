import { GetStaticPaths, GetStaticProps } from 'next';
import SiteConfig from '../lib/load-site';
import { omit } from 'lodash';
import { type IComponentExample, IComponentModule } from '../lib/load-component';

export const getStaticProps: GetStaticProps = async (context) => {
    const [type] = context.params?.path as string[];

    const path = '/' + (context.params?.path as string[]).join('/');

    const route = SiteConfig.pages.find((item: any) => item.path === path);

    if (!route) {
        return {
            notFound: true,
            revalidate: false,
        };
    }

    if (type !== 'components') {
        const { stat, readFile } = require('fs/promises');
        const { resolve } = require('path');

        const DOC_ROOT = resolve(__dirname, '../../../docs');

        const fileBase = resolve(DOC_ROOT, route.path.replace(/^\//, ''));

        const filePaths = [fileBase + '.md'];

        for (const path of filePaths) {
            try {
                const fileStat = await stat(path);

                if (fileStat.isFile()) {
                    const content = await readFile(path, 'utf8');

                    return {
                        props: {
                            ...route,
                            content,
                        },
                        revalidate: false,
                    };
                }
            } catch (e) {
                console.log(`cannot read path, ${e instanceof Error ? e.message : e}`);
            }
        }

        return {
            notFound: true,
            revalidate: false,
        };
    }

    // todo: handle intl content

    return {
        props: {
            ...omit(route, ['examples']),
            examples: route.examples?.map((item: IComponentExample) => omit(item, ['source', 'component'])) || null,
        },
        revalidate: false,
    };
};

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: SiteConfig.pages.map((item: any) => {
            return {
                params: {
                    path: item.path.split('/').filter((item: string) => item !== ''),
                },
            };
        }),
        fallback: false,
    };
};

interface IComponentProps extends IComponentModule {
    isComponent: true;
    path: string;
}

interface IDocumentProps {
    content: string;
    path: string;
}

type IProps = IComponentProps | IDocumentProps;

const Path = (props: IProps) => {
    const mergedProps = 'isComponent' in props ? {
        ...props,
        examples: SiteConfig.pages.find((item: any) => item.path === props.path).examples,
    } : props;

    console.log(mergedProps);

    return (
        <div>

        </div>
    );
};

export default Path;
