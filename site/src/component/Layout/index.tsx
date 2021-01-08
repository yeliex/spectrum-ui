import Header from '../Header';
import Navigation from '../Navigation';
import Style from './index.module.scss';
import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren<{}>) => {
    return (
        <div className={Style.container}>
            <Navigation />
            <main className={Style.content}>
                <Header />
                <article>
                    {children}
                </article>
            </main>
        </div>
    );
};

export default Layout;
