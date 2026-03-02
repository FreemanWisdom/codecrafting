import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Container from './Container';
import logo from '../assets/pictures/logo codecraft.jpeg';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'Home', to: '/' },
        { name: 'Services', to: '/services' },
        { name: 'Learn', to: '/education' },
        { name: 'Our Work', to: '/portfolio' },
        { name: 'About', to: '/about' },
        { name: 'Contact', to: '/contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-1000 bg-primary-navy shadow-[0_2px_10px_rgba(0,0,0,0.1)] py-4 transition-all duration-300">
            <Container className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <img src={logo} alt="CodeCrafting Logo" className="w-10 h-10 rounded-full object-cover border-2 border-primary-orange/20 group-hover:border-primary-orange transition-all duration-300" />
                    <span className="text-xl sm:text-2xl font-heading font-extrabold tracking-tighter text-white group-hover:text-primary-orange transition-colors duration-300">
                        CODE<span className="text-primary-orange group-hover:text-white">CRAFTING</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.to}
                            end={link.to === '/'}
                            className={({ isActive }) =>
                                `relative text-sm font-bold tracking-tight py-2 transition-colors duration-300 group ${isActive ? 'text-primary-orange' : 'text-white/80 hover:text-white'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {link.name}
                                    <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-orange transition-all duration-300 transform ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                                        }`}></span>
                                </>
                            )}
                        </NavLink>
                    ))}
                    <Link to="/contact">
                        <button className="px-6 py-2.5 bg-primary-orange text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:brightness-110 shadow-lg transition-all duration-300 cursor-pointer">
                            Work With Us
                        </button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    className="lg:hidden relative w-10 h-10 flex items-center justify-center border border-primary-orange z-1100 text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Menu"
                    aria-controls="mobile-menu"
                    aria-expanded={isMenuOpen}
                >
                    <div className="flex flex-col justify-between w-6 h-4 transform transition-all text-primary-orange duration-300">
                        <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 origin-left ${isMenuOpen ? 'rotate-45 translate-x-1 -translate-y-1' : ''}`}></span>
                        <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 origin-left ${isMenuOpen ? '-rotate-45 translate-x-1 translate-y-1' : ''}`}></span>
                    </div>
                </button>
            </Container>

            {/* Mobile Menu Overlay */}
            <div
                id="mobile-menu"
                className={`fixed inset-0 bg-white z-1050 overflow-y-auto transition-all duration-500 ease-in-out lg:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                    }`}
            >
                <div className="flex flex-col min-h-screen items-center justify-center p-6 text-center">
                    <div className="mb-12">
                        <img src={logo} alt="CodeCrafting Logo" className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-primary-orange" />
                        <span className="text-2xl font-heading font-extrabold tracking-tighter text-primary-navy">
                            CODE<span className="text-primary-orange">CRAFTING</span>
                        </span>
                    </div>

                    <div className="flex flex-col space-y-6">
                        {navLinks.map((link, index) => (
                            <NavLink
                                key={link.name}
                                to={link.to}
                                end={link.to === '/'}
                                className={({ isActive }) =>
                                    `text-2xl font-heading font-extrabold tracking-tighter transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                    } ${isActive ? 'text-primary-orange' : 'text-primary-navy hover:text-primary-orange'}`
                                }
                                style={{ transitionDelay: `${index * 100}ms` }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    <div className={`mt-16 w-full max-w-xs pt-10 border-t border-black/5 flex flex-col items-center transition-all duration-700 delay-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="w-full">
                            <button className="w-full py-4 bg-primary-orange text-white font-extrabold text-sm uppercase tracking-widest rounded-xl shadow-xl mb-10">
                                Get In Touch
                            </button>
                        </Link>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
