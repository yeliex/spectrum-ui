import React from 'react';
import Header from '../header';
import Navigation from '../navigation';
import Style from './index.less';

const Layout: React.FC = ({ children }) => {
    return (
        <>
            <Header />
            <Navigation />
            <main className={Style.content}>
                <article>
                    {children}
                </article>
            </main>
        </>
    );
};

export default Layout;
