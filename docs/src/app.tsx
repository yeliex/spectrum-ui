import React from 'react';
import Layout from './component/layout';
import { ConfigProvider } from 'spectrum-ui';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ComponentDetail from './page/component-detail';
import NotFound from './page/not-found';

const App = () => {
    return (
        <ConfigProvider>
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path="/component/:component">
                            <ComponentDetail />
                        </Route>
                        <Route>
                            <NotFound />
                        </Route>
                    </Switch>
                </Layout>
            </BrowserRouter>
        </ConfigProvider>
    );
};

export default App;
