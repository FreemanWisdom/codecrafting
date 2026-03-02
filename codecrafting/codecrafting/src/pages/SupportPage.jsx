import React, { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Mail01Icon, WhatsappIcon, Tick02Icon } from '@hugeicons/core-free-icons';
import PageHero from '../components/PageHero';
import Container from '../components/Container';
import Section from '../components/Section';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import supportBg from '../assets/pictures/contactheaderimage.jpg';

const SupportPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        document.title = 'Support — CodeCrafting';
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
                badge="Help Desk"
                title="Support Center"
                subtitle="We're committed to your long-term success. Get help with projects, account issues, or general inquiries."
                backgroundImage={supportBg}
            />

            <Container className="py-8">
                <BackButton />
            </Container>

            <Section background="white">
                <Container>
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-5 gap-16 lg:gap-24">
                            {/* Support Channels */}
                            <div className="lg:col-span-2">
                                <ScrollReveal>
                                    <h2 className="text-sm font-bold text-primary-orange uppercase tracking-widest mb-3">Support Channels</h2>
                                    <h3 className="text-3xl lg:text-5xl font-heading font-extrabold text-primary-navy mb-10 tracking-tighter leading-tight">
                                        Assistance <br /> Guaranteed.
                                    </h3>

                                    <div className="space-y-6 mb-12">
                                        {[
                                            {
                                                label: "Customer Support",
                                                value: "ccraftingcc@gmail.com",
                                                desc: "Standard inquiries and assistance.",
                                                icon: <HugeiconsIcon icon={Mail01Icon} size={24} />
                                            },
                                            {
                                                label: "WhatsApp Express",
                                                value: "+234 907 153 7759",
                                                desc: "Urgent matters and quick updates.",
                                                icon: <HugeiconsIcon icon={WhatsappIcon} size={24} />
                                            }
                                        ].map((item, index) => (
                                            <div key={index} className="p-6 bg-soft-blue border border-black/5 rounded-[32px] hover:bg-white hover:shadow-xl transition-all duration-500 group">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 bg-primary-navy text-white rounded-2xl flex items-center justify-center group-hover:bg-primary-orange transition-colors icon-3d">
                                                        {item.icon}
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] font-extrabold text-primary-orange uppercase tracking-widest block mb-1">{item.label}</span>
                                                        <p className="font-bold text-primary-navy">{item.value}</p>
                                                    </div>
                                                </div>
                                                <p className="mt-4 text-sm text-mid-slate">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Support Form */}
                            <div className="lg:col-span-3">
                                <ScrollReveal delay={0.2}>
                                    <div className="p-8 lg:p-14 bg-soft-blue border border-black/5 rounded-[48px] shadow-sm relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-orange/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>

                                        <h2 className="text-2xl font-heading font-extrabold text-primary-navy mb-8 tracking-tighter">Submit a Ticket</h2>

                                        {submitted ? (
                                            <div className="p-10 bg-white rounded-[40px] text-center slide-up shadow-xl border border-black/5 flex flex-col items-center">
                                                <div className="text-primary-orange mb-6 icon-3d">
                                                    <HugeiconsIcon icon={Tick02Icon} size={64} />
                                                </div>
                                                <h3 className="text-2xl font-heading font-bold text-primary-navy mb-4">Request Logged.</h3>
                                                <p className="text-mid-slate mb-8">We've received your support ticket. Expect a response within 24 business hours.</p>
                                                <Button variant="primary" onClick={() => setSubmitted(false)}>Submit Another</Button>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                                <div className="grid sm:grid-cols-2 gap-6">
                                                    <div>
                                                        <label htmlFor="support-name" className="block text-[10px] font-extrabold text-primary-navy/40 uppercase tracking-[0.2em] mb-3">Full Name</label>
                                                        <input
                                                            type="text" id="support-name" name="name"
                                                            value={formData.name} onChange={handleChange} required
                                                            placeholder="John Doe"
                                                            className="w-full px-6 py-4 bg-white border border-black/5 rounded-2xl text-primary-navy placeholder-mid-slate/30 focus:outline-none focus:border-primary-orange/50 transition-all duration-300"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="support-email" className="block text-[10px] font-extrabold text-primary-navy/40 uppercase tracking-[0.2em] mb-3">Email Address</label>
                                                        <input
                                                            type="email" id="support-email" name="email"
                                                            value={formData.email} onChange={handleChange} required
                                                            placeholder="john@example.com"
                                                            className="w-full px-6 py-4 bg-white border border-black/5 rounded-2xl text-primary-navy placeholder-mid-slate/30 focus:outline-none focus:border-primary-orange/50 transition-all duration-300"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="support-subject" className="block text-[10px] font-extrabold text-primary-navy/40 uppercase tracking-[0.2em] mb-3">Issue Category</label>
                                                    <select
                                                        id="support-subject" name="subject"
                                                        value={formData.subject} onChange={handleChange} required
                                                        className="w-full px-6 py-4 bg-white border border-black/5 rounded-2xl text-primary-navy focus:outline-none focus:border-primary-orange/50 transition-all duration-300 cursor-pointer"
                                                    >
                                                        <option value="">Select a Category</option>
                                                        <option value="Project Update">Project Update</option>
                                                        <option value="Technical Bug">Technical Bug</option>
                                                        <option value="Education Support">Education Support</option>
                                                        <option value="General Inquiry">General Inquiry</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label htmlFor="support-message" className="block text-[10px] font-extrabold text-primary-navy/40 uppercase tracking-[0.2em] mb-3">Detailed Message</label>
                                                    <textarea
                                                        id="support-message" name="message" rows="5"
                                                        value={formData.message} onChange={handleChange} required
                                                        placeholder="Please provide details about your request..."
                                                        className="w-full px-6 py-4 bg-white border border-black/5 rounded-2xl text-primary-navy placeholder-mid-slate/30 focus:outline-none focus:border-primary-orange/50 transition-all duration-300 resize-none"
                                                    ></textarea>
                                                </div>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full py-5 bg-primary-navy text-white text-lg font-extrabold rounded-2xl hover:bg-primary-orange transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-3 cursor-pointer"
                                                >
                                                    {isSubmitting ? 'Logging Ticket...' : 'Submit Support Ticket'}
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default SupportPage;
