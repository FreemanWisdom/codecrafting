import React from 'react';

/**
 * Modern SVG Logo Component for CodingGroups
 * Supports full logo and icon-only modes.
 */
const Logo = ({ size = 60, className = "", alt = "CodingGroups", iconOnly = false }) => {
    // We use absolute paths from public directory for SVGs to ensure they load reliably
    const logoSrc = iconOnly ? "/assets/logo-icon.svg" : "/assets/logo.svg";

    return (
        <div 
            className={`logo-container hover:scale-105 transition-transform duration-300 ease-out cursor-pointer ${className}`.trim()}
            style={{
                height: size,
                width: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
            }}
        >
            <img
                src={logoSrc}
                alt={alt}
                style={{
                    height: '100%',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                }}
                loading="eager"
                decoding="async"
                draggable="false"
            />
        </div>
    );
};

export default Logo;
