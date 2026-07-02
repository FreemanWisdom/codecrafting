import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Mail01Icon, SmartPhone01Icon } from '@hugeicons/core-free-icons';
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
                                href="mailto:ccraftingcc@gmail.com"
                                className="flex items-center gap-3 hover:text-primary-orange transition-colors duration-300 group/link"
                            >
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-white/10 transition-colors">
                                    <HugeiconsIcon icon={Mail01Icon} size={20} />
                                </div>
                                <span className="font-semibold text-lg tracking-tight">ccraftingcc@gmail.com</span>
                            </a>
                            <a
                                href="tel:+2349071537759"
                                className="flex items-center gap-3 hover:text-primary-orange transition-colors duration-300 group/link"
                            >
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-white/10 transition-colors">
                                    <HugeiconsIcon icon={SmartPhone01Icon} size={20} />
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
