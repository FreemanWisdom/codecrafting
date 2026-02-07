import React from 'react';
import Section from './Section';
import Container from './Container';
import contactHeader from '../assets/pictures/Contactheaderimage..jpg';
import ScrollReveal from './ScrollReveal';

const ContactIcon = ({ href, icon, label, brandColor }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 flex items-center justify-center rounded-xl border border-soft-blue transition-all duration-300 group relative overflow-hidden"
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
            label: 'Gmail', href: 'mailto:wisdomfreeman34@gmail.com', brandColor: '#EA4335', icon: (
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z" /></svg>
            )
        },
        {
            label: 'WhatsApp', href: 'https://wa.me/2349033320392', brandColor: '#25D366', icon: (
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.551 4.189 1.598 6.048L0 24l6.105-1.602a11.83 11.83 0 005.937 1.57h.005c6.634 0 12.032-5.396 12.035-12.03a11.87 11.87 0 00-3.522-8.498z" /></svg>
            )
        },
        {
            label: 'LinkedIn', href: 'https://linkedin.com/in/wisdomfreeman', brandColor: '#0077B5', icon: (
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            )
        },
        {
            label: 'Facebook', href: 'https://facebook.com/wisdomfreeman', brandColor: '#1877F2', icon: (
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            )
        },
        {
            label: 'X', href: 'https://x.com/wisdom_freeman', brandColor: '#000000', icon: (
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298l13.309 17.41z" /></svg>
            )
        },
        {
            label: 'Instagram', href: 'https://instagram.com/wisdom_codecraft', brandColor: '#E4405F', icon: (
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.217.562-.477.96-.896 1.382-.419.419-.818.679-1.381.896-.422.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.584-.015-4.85-.074c-1.17-.061-1.805-.256-2.227-.421-.562-.217-.96-.477-1.382-.896-.419-.419-.819-.818-1.381-.896-.422-.164-1.056-.36-2.227-.413-1.266-.057-1.646-.07-4.85-.07s-3.584.015-4.85.074c-1.17.061-1.805.256-2.227.421-.562.217-.96.477-1.382.896-.419.419-.819.818-1.381.896-.422.164-1.056.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.584-.015-4.85-.074c-1.17-.061-1.805-.256-2.227-.421-.562-.217-.96-.477-1.382-.896-.419-.419-.819.818-1.381.896-.422.164-1.056.36-2.227.413-1.266.057-1.646.07-4.85.07zM12 0C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.014 15.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" /></svg>
            )
        },
    ];

    return (
        <Section id="contact" background="white" className="pb-0!">
            <div className="relative h-64 overflow-hidden mb-16">
                <img
                    src={contactHeader}
                    alt="Contact us"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary-navy/60 flex items-center justify-center">
                    <ScrollReveal>
                        <h2 className="text-2xl lg:text-3xl font-heading text-white tracking-tighter">Get In Touch</h2>
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
