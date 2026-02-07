import React from 'react';

const Section = ({ id, children, className = '', background = 'white', ...props }) => {
    const backgrounds = {
        white: "bg-white",
        soft: "bg-soft-blue",
        navy: "bg-primary-navy text-white"
    };

    return (
        <section
            id={id}
            className={`py-20 lg:py-32 ${backgrounds[background]} ${className}`}
            {...props}
        >
            {children}
        </section>
    );
};

export default Section;
