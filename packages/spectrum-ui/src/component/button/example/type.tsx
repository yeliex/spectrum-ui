import React from 'react';
import { Button } from 'spectrum-ui';

export default (
    <>
        <Button type="primary">Primary</Button>
        <Button type="cta">CTA</Button>
        <Button type="secondary">Secondary</Button>
        <Button type="warning">Warning</Button>
        <span
            style={{
                backgroundColor: 'var(--spectrum-alias-background-color-positive, var(--spectrum-global-color-positive, var(--spectrum-semantic-positive-color-background)))',
                padding: 'var(--spectrum-global-dimension-size-300, var(--spectrum-alias-size-300))',
                display: 'inline-block',
            }}
        >
            <Button type="overBackground">OverBackground</Button>
        </span>
    </>
);
