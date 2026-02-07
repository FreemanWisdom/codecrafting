import React from 'react';

const Section = ({ id, children, className = '', background = 'white', ...props }) => {
    const backgrounds = {
        white: "bg-white",
        soft: "bg-light-teal/5",
        navy: "bg-primary-navy text-white"
    };

    return (
        <section
            id={id}
            className={`py-16 sm:py-20 lg:py-32 ${backgrounds[background]} ${className}`}
            {...props}
        >
            {children}
        </section>
    );
};

export default Section;
