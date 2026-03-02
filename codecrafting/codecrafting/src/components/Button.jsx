import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, variant = 'primary', className = '', to, ...props }) => {
    const baseStyles = "inline-flex items-center justify-center px-8 py-3 rounded-md font-medium transition-all duration-300 transform active:scale-95 cursor-pointer text-center";

    const variants = {
        primary: "bg-primary-orange text-white hover:brightness-110 shadow-md hover:shadow-lg",
        secondary: "bg-transparent border-2 border-primary-navy text-primary-navy hover:bg-primary-navy/5",
        white: "bg-white text-primary-navy hover:bg-slate-50 shadow-lg",
        outline: "bg-transparent border border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-white"
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

    if (to) {
        return (
            <Link to={to} className={combinedClassName}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClassName} {...props}>
            {children}
        </button>
    );
};

export default Button;
