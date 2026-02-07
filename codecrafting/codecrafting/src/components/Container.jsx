import React from 'react';

const Container = ({ children, className = '', ...props }) => {
    return (
        <div className={`max-w-7xl mx-auto px-6 lg:px-12 ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Container;
