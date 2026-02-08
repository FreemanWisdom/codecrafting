import React from 'react';
import Container from './Container';
import PreFooterCTA from './PreFooterCTA';

const Footer = () => {
    return (
        <footer className="bg-primary-navy text-white pt-20 pb-12">
            <Container>
                {/* Logo Section First */}
                <div className="flex flex-col items-center mb-16">
                    <span className="text-3xl font-heading font-extrabold tracking-tighter text-white mb-3 block">
                        CODE<span className="text-primary-orange">CRAFTING</span>
                    </span>
                </div>
            </Container>

            {/* CTA Section Second */}
            <div className="mb-20">
                <PreFooterCTA />
            </div>

            <Container>
                {/* Minimal Footer Info */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/10 pt-12">
                    <div className="text-sm text-mid-slate text-center md:text-left">
                        <p>© 2026 CodeCrafting. All rights reserved.</p>
                    </div>

                    <div className="text-sm text-mid-slate text-center md:text-right">
                        <div className="flex justify-center md:justify-end gap-6">
                            <a href="https://wa.me/2349071537759" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
                            <a href="mailto:ccraftingcc@gmail.com" className="hover:text-white transition-colors">Email</a>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
