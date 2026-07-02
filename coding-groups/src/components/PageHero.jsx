import React from 'react';
import Container from './Container';
import Reveal from './ScrollReveal';
import { optimizeCloudinaryImage } from '../utils/image';

const PageHero = ({ title, subtitle, badge, backgroundImage }) => {
    const optimizedBackgroundImage = optimizeCloudinaryImage(backgroundImage, 1600);

    return (
        <section className={`relative pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden ${!backgroundImage ? 'bg-primary-navy' : ''}`}>
            {/* Background Image */}
            {backgroundImage && (
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${optimizedBackgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* Overlay for readability */}
                    <div className="absolute inset-0 bg-linear-to-r from-primary-navy/90 via-primary-navy/70 to-primary-navy/30"></div>
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
                <div className="max-w-3xl">
                    {badge && (
                        <Reveal variant="fade-right" delay={0.1}>
                            <span className="inline-block px-4 py-1 bg-primary-orange/20 text-primary-orange text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                                {badge}
                            </span>
                        </Reveal>
                    )}
                    <Reveal variant="fade-up" delay={0.2}>
                        <h1 className="text-display-sm font-heading font-extrabold text-white leading-tight mb-6 tracking-tighter">
                            {title}
                        </h1>
                    </Reveal>
                    {subtitle && (
                        <Reveal variant="fade-up" delay={0.3}>
                            <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl font-medium">
                                {subtitle}
                            </p>
                        </Reveal>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default PageHero;
