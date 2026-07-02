import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

const Layout = () => {
    return (
        <div className="min-h-screen font-sans antialiased text-primary-navy bg-white">
            <ScrollToTop />
            <Navbar />
            <main className="site-main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
