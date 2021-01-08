import { AppProps } from 'next/app';
import Layout from '../component/Layout';
import '../styles/index.scss';

const App = (props: AppProps) => {
    const { Component, pageProps } = props;

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};

export default App;
