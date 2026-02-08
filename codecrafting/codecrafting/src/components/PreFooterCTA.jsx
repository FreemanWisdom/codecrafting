import React from 'react';
import Container from './Container';
import ScrollReveal from './ScrollReveal';

const PreFooterCTA = () => {
    return (
        <div id="pre-footer-cta" className="relative">
            <Container>
                <ScrollReveal>
                    <div className="text-center">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white mb-6 tracking-tighter">
                            Ready to build your website?
                        </h2>
                        <p className="text-lg sm:text-xl text-mid-slate mb-12 max-w-2xl mx-auto font-sans leading-relaxed">
                            Turning ideas into clean, functional, and modern web solutions.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/90">
                            <a
                                href="mailto:codecrafting@gmail.com"
                                className="flex items-center gap-3 hover:text-primary-orange transition-colors duration-300 group/link"
                            >
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-white/10 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="font-semibold text-lg tracking-tight">codecrafting@gmail.com</span>
                            </a>
                            <a
                                href="tel:+2349071537759"
                                className="flex items-center gap-3 hover:text-primary-orange transition-colors duration-300 group/link"
                            >
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-white/10 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <span className="font-semibold text-lg tracking-tight">+234 907 153 7759</span>
                            </a>
                        </div>
                    </div>
                </ScrollReveal>
            </Container>
        </div>
    );
};

export default PreFooterCTA;
