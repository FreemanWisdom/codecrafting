import React, { useState, useEffect } from 'react';
import Container from './Container';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('Home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Scroll Spy logic
            const sections = ['home', 'services', 'learn', 'work', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });

            if (current) {
                const linkName = current === 'home' ? 'Home' :
                    current === 'services' ? 'Services' :
                        current === 'learn' ? 'Learn' :
                            current === 'work' ? 'Our Work' : 'Contact';
                setActiveLink(linkName);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Body Scroll Lock
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
        { name: 'Home', href: '#home' },
        { name: 'Services', href: '#services' },
        { name: 'Learn', href: '#learn' },
        { name: 'Our Work', href: '#work' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-2' : 'bg-transparent py-4'
                }`}
        >
            <Container className="flex items-center justify-between">
                <a href="#home" className="flex items-center gap-2 group">
                    <span className="text-2xl font-heading font-extrabold tracking-tighter text-primary-navy group-hover:text-primary-orange transition-colors duration-300">
                        CODE<span className="text-primary-orange group-hover:text-primary-navy">CRAFTING</span>
                    </span>
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`relative text-sm font-bold tracking-tight py-2 transition-colors duration-300 group ${activeLink === link.name ? 'text-primary-orange' : 'text-primary-navy'
                                }`}
                        >
                            {link.name}
                            <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-orange transition-all duration-300 transform ${activeLink === link.name ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                                }`}></span>
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button - z-[70] to stay above z-[60] overlay */}
                <button
                    type="button"
                    className="md:hidden relative w-10 h-10 flex items-center justify-center z-[70] text-primary-navy"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Menu"
                    aria-controls="mobile-menu"
                    aria-expanded={isMenuOpen}
                >
                    <div className="flex flex-col justify-between w-6 h-4 transform transition-all duration-300">
                        <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 origin-left ${isMenuOpen ? 'rotate-45 translate-x-1 -translate-y-1' : ''}`}></span>
                        <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 origin-left ${isMenuOpen ? '-rotate-45 translate-x-1 translate-y-1' : ''}`}></span>
                    </div>
                </button>
            </Container>

            {/* Mobile Menu Overlay (Full-screen) */}
            <div
                id="mobile-menu"
                className={`fixed inset-0 bg-white z-[60] overflow-y-auto transition-all duration-500 ease-in-out md:hidden ${isMenuOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
                    }`}
            >
                {/* Full-screen Content Container */}
                <div className="flex flex-col min-h-screen items-center justify-center relative px-6 sm:px-10 py-20">
                    {/* Drawer Header (Logo Centered) */}
                    <div className="mb-10 sm:mb-12">
                        <span className="text-3xl font-heading font-extrabold tracking-tighter text-primary-navy">
                            CODE<span className="text-primary-orange">CRAFTING</span>
                        </span>
                    </div>

                    {/* Drawer Links Centered */}
                    <div className="flex flex-col items-center space-y-6 sm:space-y-8 text-center">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`text-2xl sm:text-3xl font-heading tracking-tighter transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                    } ${activeLink === link.name ? 'text-primary-orange' : 'text-primary-navy'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Drawer Footer (Socials Centered) */}
                    <div className={`mt-12 sm:mt-16 w-full max-w-sm pt-8 border-t border-soft-blue flex flex-col items-center transition-all duration-700 delay-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                        <p className="text-xs font-bold text-primary-navy uppercase tracking-widest mb-6">Connect With Us</p>
                        <div className="flex gap-6 sm:gap-8">
                            <a href="https://wa.me/2349033320392" target="_blank" rel="noopener noreferrer" className="text-primary-navy hover:text-primary-orange transition-colors">
                                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.551 4.189 1.598 6.048L0 24l6.105-1.602a11.83 11.83 0 005.937 1.57h.005c6.634 0 12.032-5.396 12.035-12.03a11.87 11.87 0 00-3.522-8.498z" /></svg>
                            </a>
                            <a href="mailto:wisdomfreeman34@gmail.com" className="text-primary-navy hover:text-primary-orange transition-colors">
                                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z" /></svg>
                            </a>
                            <a href="https://linkedin.com/in/wisdomfreeman" target="_blank" rel="noopener noreferrer" className="text-primary-navy hover:text-primary-orange transition-colors">
                                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
