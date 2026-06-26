import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
    WhatsappIcon, 
    Mail01Icon 
} from '@hugeicons/core-free-icons';
import Reveal from './ScrollReveal';
import Container from './Container';

const Contact = () => {
    const contactLinks = [
        { 
            label: 'WhatsApp', 
            value: '+234 907 153 7759', 
            icon: <HugeiconsIcon icon={WhatsappIcon} />,
            link: 'https://wa.me/2349071537759',
            color: 'text-[#25D366]'
        },
        { 
            label: 'Email', 
            value: 'ccraftingcc@gmail.com', 
            icon: <HugeiconsIcon icon={Mail01Icon} />,
            link: 'mailto:ccraftingcc@gmail.com',
            color: 'text-primary-orange'
        }
    ];

    return (
        <section id="contact" className="py-24 bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-orange/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-authority-navy/5 rounded-full blur-3xl -ml-48 -mb-48"></div>

            <Container className="relative z-10">
                <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-[1fr_1.2fr] lg:gap-24 items-start">
                    {/* Left: Contact Info */}
                    <Reveal>
                        <div className="max-w-xl">
                            <h2 className="text-secondary-orange font-bold uppercase tracking-widest text-sm mb-4">Get in Touch</h2>
                            <h3 className="text-display-sm font-heading font-black text-primary-navy mb-8 leading-tight">
                                Ready to build your <br />
                                <span className="text-primary-orange">Digital Authority?</span>
                            </h3>
                            <p className="text-lg text-mid-slate mb-12 leading-relaxed">
                                We're currently accepting new projects and redesigns. Let's discuss how we can transform your online presence into a growth engine.
                            </p>

                            <div className="space-y-6">
                                {contactLinks.map((link, index) => (
                                    <Reveal key={link.label} delay={index * 0.1} variant="scale-up" width="auto">
                                        <a 
                                            href={link.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center gap-6 p-6 rounded-3xl bg-soft-background border border-black/5 hover:border-primary-orange/20 transition-all duration-300"
                                        >
                                            <div className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform duration-300 ${link.color}`}>
                                                {link.icon}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-mid-slate uppercase tracking-wider mb-1">{link.label}</p>
                                                <p className="text-lg font-bold text-primary-navy group-hover:text-primary-orange transition-colors duration-300">{link.value}</p>
                                            </div>
                                        </a>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
};

export default Contact;
