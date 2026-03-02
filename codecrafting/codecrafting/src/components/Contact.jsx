import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Mail01Icon, WhatsappIcon, Linkedin01Icon, Facebook02Icon, NewTwitterIcon } from '@hugeicons/core-free-icons';
import Section from './Section';
import Container from './Container';
import contactHeader from '../assets/pictures/contactheaderimage.jpg';
import ScrollReveal from './ScrollReveal';

const ContactIcon = ({ href, icon, label, brandColor }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 flex items-center justify-center rounded-xl border border-primary-teal transition-all duration-300 group relative overflow-hidden"
        aria-label={label}
        style={{ color: brandColor }}
    >
        <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0"></div>
    </a>
);

const Contact = () => {
    const socialLinks = [
        {
            label: 'Gmail', href: 'mailto:ccraftingcc@gmail.com', brandColor: '#EA4335', icon: <HugeiconsIcon icon={Mail01Icon} size={28} />
        },
        {
            label: 'WhatsApp', href: 'https://wa.me/2349071537759', brandColor: '#25D366', icon: <HugeiconsIcon icon={WhatsappIcon} size={28} />
        },
        {
            label: 'LinkedIn', href: 'https://www.linkedin.com/in/wisdom-freeman-7b0529361?utm_source=share_via&utm_content=profile&utm_medium=member_android', brandColor: '#0077B5', icon: <HugeiconsIcon icon={Linkedin01Icon} size={28} />
        },
        {
            label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61575600014764', brandColor: '#1877F2', icon: <HugeiconsIcon icon={Facebook02Icon} size={28} />
        },
        {
            label: 'X', href: 'https://x.com/FreemanWis61077', brandColor: '#000000', icon: <HugeiconsIcon icon={NewTwitterIcon} size={28} />
        },
    ];

    return (
        <Section id="contact" background="white" className="pb-0!">
            <div className="relative h-56 sm:h-64 overflow-hidden mb-16">
                <img
                    src={contactHeader}
                    alt="Contact us"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary-navy/60 flex items-center justify-center">
                    <ScrollReveal>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-white tracking-tighter text-center">Get In Touch</h2>
                    </ScrollReveal>
                </div>
            </div>

            <Container className="pb-20">
                <ScrollReveal>
                    <div className="text-center">
                        <p className="text-xl text-mid-slate mb-12 max-w-2xl mx-auto">
                            Ready to start your next project or have questions about our learning platform?
                            Reach out to us on any of these platforms.
                        </p>

                        <div className="flex flex-wrap justify-center gap-6">
                            {socialLinks.map((link) => (
                                <ContactIcon key={link.label} {...link} />
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            </Container>
        </Section>
    );
};

export default Contact;
