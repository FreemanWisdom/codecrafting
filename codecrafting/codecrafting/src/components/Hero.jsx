import React from 'react';
import Container from './Container';
import Button from './Button';
import homeHeader from '../assets/pictures/Homeheader.jpg';
import ScrollReveal from './ScrollReveal';

const Hero = () => {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center pt-20 overflow-hidden"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${homeHeader})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-linear-to-r from-white via-white/90 to-transparent"></div>
            </div>

            <Container className="relative z-10">
                <ScrollReveal>
                    <div className="max-w-2xl">
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold text-primary-navy leading-[1.2] mb-8 tracking-tighter">
                            CodeCrafting — <br />
                            <span className="text-primary-orange">Shaping Your Ideas</span> <br /> Into Reality
                        </h1>
                        <p className="text-lg sm:text-xl text-mid-slate mb-10 leading-relaxed max-w-lg">
                            We build fast, clean websites for individuals and small businesses,
                            and teach the practical web development skills needed to succeed in the digital world.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="primary" onClick={() => document.getElementById('contact').scrollIntoView()}>
                                Work With CodeCrafting
                            </Button>
                            <Button variant="outline" onClick={() => document.getElementById('services').scrollIntoView()}>
                                Explore Our Services
                            </Button>
                        </div>
                    </div>
                </ScrollReveal>
            </Container>
        </section>
    );
};

export default Hero;
