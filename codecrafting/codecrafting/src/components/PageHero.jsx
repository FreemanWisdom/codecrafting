import React from 'react';
import Container from './Container';
import ScrollReveal from './ScrollReveal';

const PageHero = ({ title, subtitle, badge, backgroundImage }) => {
    return (
        <section className={`relative pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden ${!backgroundImage ? 'bg-primary-navy' : ''}`}>
            {/* Background Image */}
            {backgroundImage && (
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* Overlay for readability */}
                    <div className="absolute inset-0 bg-linear-to-r from-primary-navy via-primary-navy/80 to-primary-navy/40"></div>
                </div>
            )}

            {/* Decorative elements (only show if no background image) */}
            {!backgroundImage && (
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary-orange rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-teal rounded-full blur-3xl"></div>
                </div>
            )}

            <Container className="relative z-10">
                <ScrollReveal>
                    <div className="max-w-3xl">
                        {badge && (
                            <span className="inline-block px-4 py-1 bg-primary-orange/20 text-primary-orange text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                                {badge}
                            </span>
                        )}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-tight mb-6 tracking-tighter">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl font-medium">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </ScrollReveal>
            </Container>
        </section>
    );
};

export default PageHero;
