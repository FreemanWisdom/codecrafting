import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Container from './Container';
import SocialIcons from './SocialIcons';

const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Services', to: '/services' },
    { name: 'Learn', to: '/education' },
    { name: 'Our Work', to: '/portfolio' },
    { name: 'About', to: '/about' },
    { name: 'Contact', to: '/contact' },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('menu-open', isMenuOpen);

        return () => {
            document.body.classList.remove('menu-open');
        };
    }, [isMenuOpen]);

    useEffect(() => {
        if (!isMenuOpen) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };

        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('resize', handleResize);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', handleResize);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 12);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen((currentValue) => !currentValue);
    };

    const getNavLinkClassName = ({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`;
    const getMobileLinkClassName = ({ isActive }) => `mobile-menu-link${isActive ? ' is-active' : ''}`;

    return (
        <>
            <nav className={`navbar${isScrolled ? ' is-scrolled' : ''}${isMenuOpen ? ' is-menu-open' : ''}`}>
                <Container className="navbar-inner">
                    <div className="navbar-brand">
                        <img
                            src="/assets/logo.png"
                            alt="CodingGroups Logo"
                            className="navbar-brand-logo"
                            loading="eager"
                            decoding="async"
                            draggable="false"
                        />
                    </div>

                    <div className="nav-links" aria-label="Primary navigation">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.to}
                                end={link.to === '/'}
                                className={getNavLinkClassName}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        <Link to="/contact" className="navbar-cta">
                            Hire The Studio 
                        </Link>
                    </div>

                    <button
                        type="button"
                        className={`hamburger${isMenuOpen ? ' is-active' : ''}`}
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-controls="mobile-menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </Container>
            </nav>

            <div className={`mobile-menu-shell${isMenuOpen ? ' is-open' : ''}`} aria-hidden={!isMenuOpen}>
                <button
                    type="button"
                    className="mobile-menu-overlay"
                    aria-label="Close menu overlay"
                    onClick={() => setIsMenuOpen(false)}
                ></button>

                <div id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation">


                    <div className="mobile-menu-links">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.to}
                                end={link.to === '/'}
                                className={getMobileLinkClassName}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    <div className="mobile-menu-footer">
                        <Link to="/contact" className="mobile-menu-cta" onClick={() => setIsMenuOpen(false)}>
                            Start a Project
                        </Link>
                        <SocialIcons
                            className="mobile-social-icons"
                            linkClassName="mobile-social-icon-link"
                            size={24}
                            onItemClick={() => setIsMenuOpen(false)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
