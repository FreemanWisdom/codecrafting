import React from 'react';

const Section = ({ id, children, className = '', background = 'white', ...props }) => {
    const backgrounds = {
        white: "bg-white",
        soft: "bg-soft-gray",
        navy: "bg-primary-navy text-white",
        deep: "bg-deep-navy text-white",
        mesh: "mesh-gradient text-white"
    };

    return (
        <section
            id={id}
            className={`section-premium ${backgrounds[background]} ${className}`}
            {...props}
        >
            {children}
        </section>
    );
};

export default Section;
