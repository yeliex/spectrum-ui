import React from 'react';
import ReactDom from 'react-dom';
import './lib/load-component';
import './lib/load-site';
import App from './app';
import './index.less';

ReactDom.render(
    <App />,
    window.document.getElementById('root'),
);
