import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({ 
    children, 
    width = "100%", 
    delay = 0, 
    variant = "fade-up", 
    threshold = 0.1, 
    distance = "30px", 
    duration = 0.8 
}) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold,
            }
        );

        if (node) {
            observer.observe(node);
        }

        return () => {
            if (node) {
                observer.unobserve(node);
            }
        };
    }, [threshold]);

    const getInitialStyles = () => {
        switch (variant) {
            case "fade-down": return { opacity: 0, transform: `translateY(-${distance})` };
            case "fade-left": return { opacity: 0, transform: `translateX(${distance})` };
            case "fade-right": return { opacity: 0, transform: `translateX(-${distance})` };
            case "scale-up": return { opacity: 0, transform: 'scale(0.95)' };
            default: return { opacity: 0, transform: `translateY(${distance})` };
        }
    };

    const initialStyles = getInitialStyles();

    return (
        <div
            ref={ref}
            style={{
                width,
                opacity: isVisible ? 1 : initialStyles.opacity,
                transform: isVisible ? 'translate(0, 0) scale(1)' : initialStyles.transform,
                transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
                willChange: 'transform, opacity'
            }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
