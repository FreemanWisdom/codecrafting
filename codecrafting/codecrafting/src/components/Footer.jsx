import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import { HugeiconsIcon } from '@hugeicons/react';
import { NewTwitterIcon, Facebook02Icon, WhatsappIcon } from '@hugeicons/core-free-icons';

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
        <footer className="bg-primary-navy text-white pt-20 pb-8">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="inline-block mb-4">
                            <span className="text-2xl font-heading font-extrabold tracking-tighter text-white">
                                CODE<span className="text-primary-orange">CRAFTING</span>
                            </span>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                            Building high-performance websites and training the next generation of frontend developers.
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
                                        className="text-white/60 hover:text-primary-orange transition-colors duration-300 text-sm"
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
                                        className="text-white/60 hover:text-primary-orange transition-colors duration-300 text-sm"
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
                        <div className="flex gap-4 mb-6">
                            {/* X (Twitter) */}
                            <a href="https://x.com/FreemanWis61077" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-primary-orange hover:bg-white/10 transition-all duration-300">
                                <HugeiconsIcon icon={NewTwitterIcon} size={18} />
                            </a>
                            {/* Facebook */}
                            <a href="https://www.facebook.com/profile.php?id=61575600014764" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-primary-orange hover:bg-white/10 transition-all duration-300">
                                <HugeiconsIcon icon={Facebook02Icon} size={18} />
                            </a>
                            {/* WhatsApp */}
                            <a href="https://wa.me/2349071537759" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-primary-orange hover:bg-white/10 transition-all duration-300">
                                <HugeiconsIcon icon={WhatsappIcon} size={18} />
                            </a>
                        </div>
                        <p className="text-white/40 text-xs">+234 907 153 7759, +234 916 556 0407</p>
                        <p className="text-white/40 text-xs">ccraftingcc@gmail.com</p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white/40">
                        ©2025 CodeCrafting. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-white/40">
                        <Link to="/legal" className="hover:text-primary-orange transition-colors">Privacy Policy</Link>
                        <Link to="/legal" className="hover:text-primary-orange transition-colors">Terms & Conditions</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
