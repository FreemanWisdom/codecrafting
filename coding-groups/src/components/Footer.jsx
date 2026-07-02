import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import Logo from './Logo';
import SocialIcons from './SocialIcons';

const Footer = () => {
    const quickLinks = [
        { name: 'Home', to: '/' },
        { name: 'Services', to: '/services' },
        { name: 'About', to: '/about' },
        { name: 'Portfolio', to: '/portfolio' },
    ];

    const resourceLinks = [
        { name: 'FAQs', to: '/faqs' },
        { name: 'Support', to: '/support' },
        { name: 'Legal', to: '/legal' },
        { name: 'Contact', to: '/contact' },
    ];

    return (
        <footer className="site-footer pt-20 pb-8 mt-12">
            <Container>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="inline-block mb-6" aria-label="Go to Home">
                            <img
                                src="/assets/logo.png"
                                alt="CodingGroups Logo"
                                className="navbar-brand-logo"
                                style={{ height: '82px', width: 'auto' }}
                                loading="lazy"
                            />
                        </Link>
                        <p className="text-mid-slate text-sm leading-relaxed mb-6">
                            Building high-performance websites and empowering businesses through digital engineering.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-primary-orange mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.to}
                                        className="text-mid-slate hover:text-primary-orange transition-colors duration-300 text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="col-span-1">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-primary-orange mb-6">Support</h4>
                        <ul className="space-y-3">
                            {resourceLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.to}
                                        className="text-mid-slate hover:text-primary-orange transition-colors duration-300 text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="col-span-2 md:col-span-1">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-primary-orange mb-6">Connect</h4>
                        <SocialIcons className="social-icons mb-6" size={20} />
                        <p className="text-mid-slate/50 text-xs">+234 907 153 7759, +234 916 556 0407</p>
                        <p className="text-mid-slate/50 text-xs">ccraftingcc@gmail.com</p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-black/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-mid-slate/50">
                        © 2026 CodingGroups. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-mid-slate/50">
                        <Link to="/legal" className="hover:text-primary-orange transition-colors">Privacy Policy</Link>
                        <Link to="/legal" className="hover:text-primary-orange transition-colors">Terms & Conditions</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
