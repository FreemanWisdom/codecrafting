import React, { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { SentIcon, ArrowRight01Icon, Mail01Icon, WhatsappIcon } from '@hugeicons/core-free-icons';
import PageHero from '../components/PageHero';
import Container from '../components/Container';
import Section from '../components/Section';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import contactBg from '../assets/pictures/contactheaderimage.jpg';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        document.title = 'Contact — CodeCrafting';
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1200);
    };

    return (
        <div className="page-enter">
            <PageHero
                badge="Connect"
                title="Let's Build Something Great"
                subtitle="Reach out for project inquiries, collaboration, or any questions you may have."
                backgroundImage={contactBg}
            />

            <Container className="py-8">
                <BackButton />
            </Container>

            <Section background="white">
                <Container>
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-20">
                            {/* Contact Form */}
                            <ScrollReveal>
                                <div>
                                    <h2 className="text-sm font-bold text-primary-orange uppercase tracking-widest mb-3">Get in Touch</h2>
                                    <h3 className="text-3xl lg:text-5xl font-heading font-extrabold text-primary-navy mb-10 tracking-tighter leading-tight">
                                        Send a Message
                                    </h3>

                                    {submitted ? (
                                        <div className="p-12 bg-soft-blue rounded-[40px] border border-black/5 text-center slide-up shadow-2xl flex flex-col items-center">
                                            <div className="text-primary-orange mb-6">
                                                <HugeiconsIcon icon={SentIcon} size={64} />
                                            </div>
                                            <h3 className="text-3xl font-heading font-bold text-primary-navy mb-4">Message Received.</h3>
                                            <p className="text-mid-slate text-lg">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                                            <button
                                                onClick={() => setSubmitted(false)}
                                                className="mt-8 text-primary-orange font-bold hover:gap-3 transition-all flex items-center gap-2 mx-auto cursor-pointer"
                                            >
                                                Send Another Message <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid sm:grid-cols-2 gap-6">
                                                <div>
                                                    <label htmlFor="contact-name" className="block text-xs font-bold text-primary-navy uppercase tracking-widest mb-3">
                                                        Full Name
                                                    </label>
                                                    <input
                                                        type="text" id="contact-name" name="name"
                                                        value={formData.name} onChange={handleChange} required
                                                        placeholder="Your name"
                                                        className="w-full px-6 py-4 bg-soft-blue border border-black/5 rounded-2xl text-primary-navy placeholder-mid-slate/30 focus:outline-none focus:border-primary-orange/50 transition-all duration-300"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="contact-email" className="block text-xs font-bold text-primary-navy uppercase tracking-widest mb-3">
                                                        Email Address
                                                    </label>
                                                    <input
                                                        type="email" id="contact-email" name="email"
                                                        value={formData.email} onChange={handleChange} required
                                                        placeholder="you@example.com"
                                                        className="w-full px-6 py-4 bg-soft-blue border border-black/5 rounded-2xl text-primary-navy placeholder-mid-slate/30 focus:outline-none focus:border-primary-orange/50 transition-all duration-300"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="contact-subject" className="block text-xs font-bold text-primary-navy uppercase tracking-widest mb-3">
                                                    Subject
                                                </label>
                                                <input
                                                    type="text" id="contact-subject" name="subject"
                                                    value={formData.subject} onChange={handleChange} required
                                                    placeholder="What's this about?"
                                                    className="w-full px-6 py-4 bg-soft-blue border border-black/5 rounded-2xl text-primary-navy placeholder-mid-slate/30 focus:outline-none focus:border-primary-orange/50 transition-all duration-300"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="contact-message" className="block text-xs font-bold text-primary-navy uppercase tracking-widest mb-3">
                                                    Your Message
                                                </label>
                                                <textarea
                                                    id="contact-message" name="message" rows="5"
                                                    value={formData.message} onChange={handleChange} required
                                                    placeholder="Tell us about your project..."
                                                    className="w-full px-6 py-4 bg-soft-blue border border-black/5 rounded-2xl text-primary-navy placeholder-mid-slate/30 focus:outline-none focus:border-primary-orange/50 transition-all duration-300 resize-none"
                                                ></textarea>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full py-5 bg-primary-orange text-white font-extrabold text-lg rounded-2xl hover:brightness-110 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-3 cursor-pointer"
                                            >
                                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </ScrollReveal>

                            {/* Contact Sidebar */}
                            <ScrollReveal delay={0.2}>
                                <div className="lg:pl-10">
                                    <h2 className="text-sm font-bold text-primary-orange uppercase tracking-widest mb-3">Direct Channels</h2>
                                    <h3 className="text-3xl lg:text-5xl font-heading font-extrabold text-primary-navy mb-10 tracking-tighter leading-tight">
                                        Let's Talk.
                                    </h3>

                                    <div className="space-y-8 mb-16">
                                        <a href="mailto:ccraftingcc@gmail.com" className="group flex items-center gap-6 p-6 bg-soft-blue border border-black/5 rounded-[32px] hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                                            <div className="w-14 h-14 bg-primary-navy text-white rounded-2xl flex items-center justify-center group-hover:bg-primary-orange transition-colors icon-3d">
                                                <HugeiconsIcon icon={Mail01Icon} size={24} />
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-extrabold text-primary-orange uppercase tracking-[0.2em] mb-1 block">Email Us</span>
                                                <span className="text-lg font-bold text-primary-navy">ccraftingcc@gmail.com</span>
                                            </div>
                                        </a>

                                        <a href="https://wa.me/2349071537759" className="group flex items-center gap-6 p-6 bg-soft-blue border border-black/5 rounded-[32px] hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                                            <div className="w-14 h-14 bg-[#25D366] text-white rounded-2xl flex items-center justify-center icon-3d">
                                                <HugeiconsIcon icon={WhatsappIcon} size={24} />
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-extrabold text-primary-orange uppercase tracking-[0.2em] mb-1 block">WhatsApp</span>
                                                <span className="text-lg font-bold text-primary-navy">+234 907 153 7759</span>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="p-10 bg-primary-navy rounded-[40px] text-white overflow-hidden relative group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-orange/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary-orange/40 transition-all duration-500"></div>
                                        <h4 className="text-xl font-heading font-extrabold mb-4">Response Guarantee</h4>
                                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                                            We value your time. All inquiries are screened and addressed within 24 hours on business days.
                                        </p>
                                        <div className="flex items-center gap-3 text-primary-orange font-bold text-xs uppercase tracking-widest">
                                            <span className="w-2 h-2 rounded-full bg-primary-orange animate-pulse"></span>
                                            Available Now
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default ContactPage;
