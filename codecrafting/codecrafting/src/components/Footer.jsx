import React from 'react';
import Container from './Container';

const Footer = () => {
    return (
        <footer className="bg-primary-navy text-white py-16">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start">
                        <span className="text-2xl font-heading font-extrabold tracking-tighter text-white mb-4 block">
                            CODE<span className="text-primary-orange">CRAFTING</span>
                        </span>
                        <p className="text-mid-slate text-sm">Web solutions & practical learning</p>
                    </div>

                    <div className="text-sm text-mid-slate text-center md:text-right">
                        <p>© 2026 CodeCrafting. All rights reserved.</p>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
