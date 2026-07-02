import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { SentIcon, ArrowRight01Icon, Mail01Icon, WhatsappIcon } from '@hugeicons/core-free-icons';
import PageHero from '../components/PageHero';
import Container from '../components/Container';
import Section from '../components/Section';
import Reveal from '../components/ScrollReveal';
import BackButton from '../components/BackButton';
import { StarRating } from '../components/ReviewCard';
import { submitEmailHandler } from '../utils/emailHandler';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';
import contactBg from '../assets/pictures/contactheaderimage.jpg';
import { useSiteContent } from '../hooks/useSiteContent';
import SEO from '../components/SEO';

const initialContactForm = { name: '', email: '', subject: '', message: '' };
const initialReviewForm = { name: '', message: '', rating: 5 };

const ContactPage = () => {
    const { siteContent } = useSiteContent();
    const activeContactBg = siteContent.contact_bg || contactBg;
    const [formData, setFormData] = useState(initialContactForm);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState({ type: '', message: '' });
    const [reviewFormData, setReviewFormData] = useState(initialReviewForm);
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [reviewFeedback, setReviewFeedback] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleReviewFieldChange = (e) => {
        setReviewFormData({ ...reviewFormData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        setFeedback({ type: '', message: '' });

        try {
            const result = await submitEmailHandler({
                email: formData.email,
                type: 'contact',
                message: `Name: ${formData.name}\nSubject: ${formData.subject}\nMessage: ${formData.message}`,
            });

            if (!result.success) {
                setFeedback({
                    type: 'error',
                    message: result.message || 'Something went wrong.',
                });
                return;
            }

            setSubmitted(true);
            setFormData(initialContactForm);
        } catch (error) {
            console.error('Contact submission failed:', error);
            setFeedback({
                type: 'error',
                message: 'Something went wrong.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (isSubmittingReview) return;

        if (!isSupabaseConfigured || !supabase) {
            setReviewFeedback({
                type: 'error',
                message: 'Reviews are unavailable right now.',
            });
            return;
        }

        const trimmedName = reviewFormData.name.trim();
        const trimmedMessage = reviewFormData.message.trim();

        if (!trimmedName) {
            setReviewFeedback({
                type: 'error',
                message: 'Name is required.',
            });
            return;
        }

        if (trimmedMessage.length < 10) {
            setReviewFeedback({
                type: 'error',
                message: 'Message must be at least 10 characters long.',
            });
            return;
        }

        setIsSubmittingReview(true);
        setReviewFeedback({ type: '', message: '' });

        try {
            const { error } = await supabase.from('reviews').insert([
                {
                    name: trimmedName,
                    message: trimmedMessage,
                    rating: reviewFormData.rating,
                    approved: false,
                },
            ]);

            if (error) {
                throw error;
            }

            setReviewFormData(initialReviewForm);
            setReviewFeedback({
                type: 'success',
                message: 'Thanks for your review. It has been submitted for approval.',
            });
        } catch (error) {
            console.error('Review submission failed:', error);
            setReviewFeedback({
                type: 'error',
                message: error.message || 'We could not submit your review right now.',
            });
        } finally {
            setIsSubmittingReview(false);
        }
    };

    return (
        <div className="page-enter">
            <SEO 
                title="Contact" 
                description="Get in touch with CodingGroups to discuss your next web project. We're ready to build your digital authority."
                url="/contact"
            />
            <PageHero
                badge="Connect"
                title="Let's Build Something Great"
                subtitle="Reach out for project inquiries, collaboration, or any questions you may have."
                backgroundImage={activeContactBg}
            />

            <Container className="py-8">
                <BackButton />
            </Container>

            <Section background="white">
                <Container>
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-20">
                            <Reveal>
                                <div>
                                    <p className="text-sm font-bold text-primary-orange uppercase tracking-[0.2em] mb-4 text-gradient">Get in Touch</p>
                                    <h2 className="text-display-sm font-heading font-extrabold text-primary-navy mb-12 heading-premium text-balance">
                                        Start Your Project With Us
                                    </h2>

                                    {submitted ? (
                                        <div className="p-12 bg-soft-blue rounded-[40px] border border-black/5 text-center slide-up shadow-2xl flex flex-col items-center">
                                            <div className="text-primary-orange mb-6">
                                                <HugeiconsIcon icon={SentIcon} size={64} />
                                            </div>
                                            <h3 className="text-3xl font-heading font-bold text-primary-navy mb-4">Message Received.</h3>
                                            <p className="text-mid-slate text-lg">Thank you for reaching out. We will get back to you within 24 hours.</p>
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
                                                        type="text"
                                                        id="contact-name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="Your name"
                                                        className="w-full px-6 py-4 bg-soft-blue border border-black/5 rounded-2xl text-primary-navy placeholder-mid-slate/30 focus:outline-none focus:border-primary-orange/50 transition-all duration-300"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="contact-email" className="block text-xs font-bold text-primary-navy uppercase tracking-widest mb-3">
                                                        Email Address
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="contact-email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
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
                                                    type="text"
                                                    id="contact-subject"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="What's this about?"
                                                    className="w-full px-6 py-4 bg-soft-blue border border-black/5 rounded-2xl text-primary-navy placeholder-mid-slate/30 focus:outline-none focus:border-primary-orange/50 transition-all duration-300"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="contact-message" className="block text-xs font-bold text-primary-navy uppercase tracking-widest mb-3">
                                                    Your Message
                                                </label>
                                                <textarea
                                                    id="contact-message"
                                                    name="message"
                                                    rows="5"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Tell us about your project..."
                                                    className="w-full px-6 py-4 bg-soft-blue border border-black/5 rounded-2xl text-primary-navy placeholder-mid-slate/30 focus:outline-none focus:border-primary-orange/50 transition-all duration-300 resize-none"
                                                ></textarea>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full py-6 bg-linear-to-r from-primary-orange to-[#FF8A3D] text-white font-extrabold text-lg rounded-2xl shadow-xl shadow-primary-orange/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
                                            >
                                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                            </button>
                                            {feedback.message && (
                                                <p
                                                    role="status"
                                                    aria-live="polite"
                                                    className={`text-sm font-semibold ${
                                                        feedback.type === 'error' ? 'text-red-500' : 'text-primary-navy'
                                                    }`}
                                                >
                                                    {feedback.message}
                                                </p>
                                            )}
                                        </form>
                                    )}
                                </div>
                            </Reveal>

                            <Reveal delay={0.2}>
                                <div className="lg:pl-10">
                                    <p className="text-sm font-bold text-primary-orange uppercase tracking-widest mb-3">Direct Channels</p>
                                    <h2 className="text-display-sm font-heading font-extrabold text-primary-navy mb-10 tracking-tighter leading-tight">
                                        Let's Talk.
                                    </h2>

                                    <div className="space-y-6 mb-16">
                                        <a href="mailto:ccraftingcc@gmail.com" className="group flex items-center gap-8 p-10 bg-white border-premium rounded-[40px] hover:shadow-2xl hover:-translate-y-2 transition-all duration-700">
                                            <div className="w-16 h-16 bg-primary-navy text-white rounded-2xl flex items-center justify-center group-hover:bg-primary-orange transition-colors icon-3d shadow-lg shadow-primary-navy/20">
                                                <HugeiconsIcon icon={Mail01Icon} size={28} />
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-black text-primary-orange uppercase tracking-[0.3em] mb-2 block">Direct Email</span>
                                                <span className="text-xl font-bold text-primary-navy tracking-tight">ccraftingcc@gmail.com</span>
                                            </div>
                                        </a>

                                        <a href="https://wa.me/2349071537759" className="group flex items-center gap-8 p-10 bg-white border-premium rounded-[40px] hover:shadow-2xl hover:-translate-y-2 transition-all duration-700">
                                            <div className="w-16 h-16 bg-[#25D366] text-white rounded-2xl flex items-center justify-center icon-3d shadow-lg shadow-[#25D366]/20">
                                                <HugeiconsIcon icon={WhatsappIcon} size={28} />
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-black text-primary-orange uppercase tracking-[0.3em] mb-2 block">WhatsApp Business</span>
                                                <span className="text-xl font-bold text-primary-navy tracking-tight">+234 907 153 7759</span>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="p-12 lg:p-16 bg-white rounded-[50px] overflow-hidden relative group border border-black/5 shadow-premium">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-orange/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-primary-orange/10 transition-all duration-1000"></div>
                                        <h4 className="text-3xl font-heading font-extrabold mb-6 heading-premium text-primary-navy tracking-tighter">Fast Delivery</h4>
                                        <p className="text-mid-slate text-lg leading-relaxed mb-10 font-medium">
                                            We respect your timelines. All inquiries are screened and addressed within 24 hours on business days to ensure your project stays on track.
                                        </p>
                                        <div className="flex items-center gap-4 text-primary-orange font-black text-xs uppercase tracking-[0.2em]">
                                            <span className="w-3 h-3 rounded-full bg-primary-orange animate-pulse shadow-lg shadow-primary-orange/50"></span>
                                            Ready for New Projects
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </Container>
            </Section>

            <Section background="soft" className="section-premium">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-start">
                        <Reveal>
                            <div className="max-w-xl">
                                <p className="text-sm font-bold text-primary-orange uppercase tracking-[0.2em] mb-4">Client Reviews</p>
                                <h2 className="text-display-sm font-heading font-extrabold text-primary-navy mb-8 heading-premium text-balance">
                                    Share your experience with CodingGroups.
                                </h2>
                                <p className="text-lg leading-relaxed text-mid-slate mb-6">
                                    Reviews help future clients understand what it feels like to work with us. Every submission is moderated before it appears on the Home or About pages.
                                </p>
                                <div className="rounded-[32px] border border-primary-orange/15 bg-white/80 p-8 shadow-[0_18px_40px_rgba(17,57,89,0.06)]">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-primary-orange mb-3">Before You Submit</p>
                                    <p className="text-base leading-relaxed text-mid-slate">
                                        Include a short, honest note about the project outcome, communication, or delivery process. Ratings run from 1 to 5.
                                    </p>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <div className="rounded-[40px] border border-black/5 bg-white p-8 md:p-10 shadow-[0_24px_60px_rgba(17,57,89,0.08)]">
                                <form onSubmit={handleReviewSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="review-name" className="mb-3 block text-xs font-bold uppercase tracking-widest text-primary-navy">
                                            Name
                                        </label>
                                        <input
                                            id="review-name"
                                            type="text"
                                            name="name"
                                            value={reviewFormData.name}
                                            onChange={handleReviewFieldChange}
                                            required
                                            placeholder="Your name"
                                            className="w-full rounded-2xl border border-black/5 bg-soft-blue px-6 py-4 text-primary-navy placeholder-mid-slate/30 transition-all duration-300 focus:border-primary-orange/50 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="review-message" className="mb-3 block text-xs font-bold uppercase tracking-widest text-primary-navy">
                                            Message
                                        </label>
                                        <textarea
                                            id="review-message"
                                            name="message"
                                            rows="5"
                                            minLength={10}
                                            value={reviewFormData.message}
                                            onChange={handleReviewFieldChange}
                                            required
                                            placeholder="Tell future clients what it was like working with CodingGroups."
                                            className="w-full rounded-2xl border border-black/5 bg-soft-blue px-6 py-4 text-primary-navy placeholder-mid-slate/30 transition-all duration-300 focus:border-primary-orange/50 focus:outline-none resize-none"
                                        />
                                        <p className="mt-2 text-xs font-medium text-mid-slate">Minimum 10 characters.</p>
                                    </div>

                                    <div>
                                        <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-primary-navy">
                                            Rating
                                        </span>
                                        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-black/5 bg-soft-blue px-6 py-4">
                                            <StarRating
                                                rating={reviewFormData.rating}
                                                onChange={(value) => setReviewFormData({ ...reviewFormData, rating: value })}
                                            />
                                            <span className="text-sm font-semibold text-primary-navy">
                                                {reviewFormData.rating} / 5
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmittingReview}
                                        className="inline-flex min-h-[3.75rem] w-full items-center justify-center rounded-2xl bg-linear-to-r from-primary-orange to-[#FF8A3D] px-8 py-4 text-base font-extrabold text-white shadow-xl shadow-primary-orange/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-orange/30 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                                    </button>

                                    {reviewFeedback.message ? (
                                        <p
                                            role="status"
                                            aria-live="polite"
                                            className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
                                                reviewFeedback.type === 'error'
                                                    ? 'border border-red-200 bg-red-50 text-red-600'
                                                    : 'border border-green-200 bg-green-50 text-green-700'
                                            }`}
                                        >
                                            {reviewFeedback.message}
                                        </p>
                                    ) : null}
                                </form>
                            </div>
                        </Reveal>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default ContactPage;
