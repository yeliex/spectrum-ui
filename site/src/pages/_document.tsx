import * as React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
    return (
        <Html lang="en" className="spectrum spectrum--medium spectrum--light">
            <Head>
                <meta name="renderer" content="webkit" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="applicable-device" content="pc,mobile" />
                <meta httpEquiv="Cache-Control" content="no-transform" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="referrer" content="always" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
