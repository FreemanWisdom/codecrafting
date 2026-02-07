import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-8 py-3 rounded-md font-medium transition-all duration-300 transform active:scale-95 cursor-pointer";

    const variants = {
        primary: "bg-primary-blue text-white hover:bg-secondary-blue shadow-md",
        secondary: "bg-transparent border-2 border-primary-blue text-primary-blue hover:bg-soft-blue",
        white: "bg-white text-primary-navy hover:bg-soft-blue shadow-lg",
        outline: "bg-transparent border border-mid-slate text-mid-slate hover:border-primary-blue hover:text-primary-blue"
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
