import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

const Layout = () => {
    return (
        <div className="min-h-screen font-sans antialiased text-deep-slate bg-white">
            <ScrollToTop />
            <Navbar />
            <main className="pt-[72px] sm:pt-[80px]">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
