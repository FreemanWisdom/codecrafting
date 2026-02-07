import React from 'react';
import Container from './Container';
import logo from '../assets/pictures/Craftlogo.png';

const Footer = () => {
    return (
        <footer className="bg-primary-navy text-white py-16">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start">
                        <img
                            src={logo}
                            alt="CodeCrafting"
                            className="h-20 w-auto mb-4 hover:brightness-110 transition-all duration-300"
                            style={{ mixBlendMode: 'screen' }}
                        />
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
