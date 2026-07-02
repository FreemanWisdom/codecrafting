import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, variant = 'primary', className = '', to, ...props }) => {
    const baseStyles = "inline-flex items-center justify-center px-10 py-4 rounded-2xl font-bold tracking-tight transition-all duration-500 transform active:scale-95 cursor-pointer text-center";

    const variants = {
        primary: "bg-linear-to-r from-primary-orange to-[#FF8A3D] text-white shadow-xl shadow-primary-orange/20 hover:shadow-2xl hover:shadow-primary-orange/40 hover:-translate-y-1 hover:brightness-105",
        secondary: "bg-transparent border-2 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white",
        white: "bg-white text-primary-navy hover:bg-slate-50 shadow-xl",
        outline: "bg-transparent border-2 border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-white shadow-lg shadow-primary-orange/5"
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
