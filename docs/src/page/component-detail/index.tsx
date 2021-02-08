import React from 'react';
import { useRouteMatch } from 'react-router';
import ComponentConfig from '../../lib/load-component';
import NotFound from '../not-found';
import { Typography } from 'spectrum-ui';
import Style from './index.less';

const ComponentDetail = () => {
    const { params } = useRouteMatch<any>();

    const { component: componentName } = params;

    const component = ComponentConfig[componentName];

    if (!componentName || !component) {
        return <NotFound />;
    }

    return (
        <div>
            <Typography.Heading serif level={1}>{component.meta.name}</Typography.Heading>
            <Typography.Body>{component.meta.description}</Typography.Body>
            {
                Object.keys(component.example || {}).map((name) => {
                    const example = (component.meta.example || {})[name] || {};

                    return (
                        <Typography id={`component-${componentName}-demo-${name}`} className={Style.example} key={name}>
                            <Typography.Heading level={2}>{example.name || name}</Typography.Heading>
                            <p>{example.description}</p>
                            <div className={Style.exampleContent}>
                                <div className={Style.exampleContentDemo}>
                                    {
                                        component.example && React.cloneElement(component.example[name].component)
                                    }
                                </div>
                                <div className={Style.exampleContentMarkup}>
                                    <Typography.Code pre>
                                        {component.example[name].source}
                                    </Typography.Code>
                                </div>
                            </div>
                        </Typography>
                    );
                })
            }
        </div>
    );
};

export default ComponentDetail;
