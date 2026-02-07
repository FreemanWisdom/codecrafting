import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-8 py-3 rounded-md font-medium transition-all duration-300 transform active:scale-95 cursor-pointer";

    const variants = {
        primary: "bg-primary-orange text-white hover:bg-opacity-90 shadow-md",
        secondary: "bg-transparent border-2 border-primary-teal text-primary-teal hover:bg-light-teal/10",
        white: "bg-white text-primary-navy hover:bg-slate-50 shadow-lg",
        outline: "bg-transparent border border-mid-slate text-mid-slate hover:border-primary-orange hover:text-primary-orange"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
