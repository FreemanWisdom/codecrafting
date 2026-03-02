import React, { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Settings02Icon, RocketIcon, TeacherIcon, Diamond01Icon, Tick01Icon, Tick02Icon, Loading03Icon } from '@hugeicons/core-free-icons';
import PageHero from '../components/PageHero';
import Container from '../components/Container';
import Section from '../components/Section';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import educationBg from '../assets/pictures/Learnslideimg5.jpg';

const EducationPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        document.title = 'Education — CodeCrafting';
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setFormData({ name: '', email: '', whatsapp: '' });
        }, 1200);
    };

    return (
        <div className="page-enter">
            <PageHero
                badge="Skill Development"
                title="Master the Art of Web Development"
                subtitle="Practical, project-based learning for aspiring developers. We don't just teach code; we teach craftsmanship."
                backgroundImage={educationBg}
            />

            <Container className="py-8">
                <BackButton />
            </Container>

            {/* Positioning Statement */}
            <Section background="white">
                <Container>
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-20">
                                <h2 className="text-sm font-bold text-primary-orange uppercase tracking-widest mb-3">Our Philosophy</h2>
                                <h3 className="text-3xl lg:text-6xl font-heading font-extrabold text-primary-navy mb-8 tracking-tighter leading-tight">
                                    Skip the Fluff. <br /> <span className="text-primary-orange">Build Real Products.</span>
                                </h3>
                                <p className="text-xl text-mid-slate max-w-3xl mx-auto leading-relaxed">
                                    CodeCrafting Education is a skill-development platform designed for those who want to master real-world frontend development through hands-on practice and expert mentorship.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
                                {[
                                    {
                                        title: "Pragmatic Curriculum",
                                        desc: "Focused on the modern React ecosystem, Tailwind CSS, and enterprise-level UI/UX standards.",
                                        icon: <HugeiconsIcon icon={Settings02Icon} size={40} className="text-primary-orange" />
                                    },
                                    {
                                        title: "Project-Driven Lessons",
                                        desc: "Every concept is taught through the lens of building actual, production-ready components and apps.",
                                        icon: <HugeiconsIcon icon={RocketIcon} size={40} className="text-primary-orange" />
                                    },
                                    {
                                        title: "One-on-One Mentorship",
                                        desc: "Direct access to experienced developers for personalized code reviews and career guidance.",
                                        icon: <HugeiconsIcon icon={TeacherIcon} size={40} className="text-primary-orange" />
                                    },
                                    {
                                        title: "Authority Positioning",
                                        desc: "We teach you how to think like an engineer, not just a coder. Learn to design for impact.",
                                        icon: <HugeiconsIcon icon={Diamond01Icon} size={40} className="text-primary-orange" />
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="p-10 bg-white border border-black/5 rounded-3xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                                        <div className="mb-6 opacity-40 group-hover:opacity-100 transition-all duration-500">{item.icon}</div>
                                        <h3 className="text-2xl font-heading font-extrabold text-primary-navy mb-4 tracking-tighter">{item.title}</h3>
                                        <p className="text-mid-slate text-base leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </Container>
            </Section>

            {/* Disclaimer */}
            <Section background="soft">
                <Container>
                    <ScrollReveal>
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="p-10 bg-white shadow-xl rounded-3xl border border-primary-orange/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-orange/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                <h3 className="text-2xl font-heading font-extrabold text-primary-navy mb-6 tracking-tighter">A Note on Certification</h3>
                                <p className="text-lg text-mid-slate leading-relaxed mb-8">
                                    We focus on <span className="text-primary-navy font-bold">Practical Mastery</span>.
                                    CodeCrafting is a skill-development hub, not an academic institution. We do not provide certificates or formal qualifications. We provide the skills you need to build, deploy, and succeed.
                                </p>
                                <div className="inline-flex items-center gap-3 text-primary-orange font-bold text-sm">
                                    <HugeiconsIcon icon={Tick01Icon} size={20} />
                                    Focusing on actual results.
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </Container>
            </Section>

            {/* Waitlist Form */}
            <Section background="navy">
                <Container className="relative overflow-hidden py-10 lg:py-20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-orange/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-orange/10 rounded-full blur-[100px] -ml-48 -mb-48"></div>

                    <ScrollReveal>
                        <div className="max-w-2xl mx-auto text-center relative z-10">
                            <span className="inline-block px-5 py-2 bg-primary-orange/20 text-primary-orange text-[10px] font-extrabold uppercase tracking-widest rounded-full mb-8">
                                Limited Availability
                            </span>
                            <h2 className="text-4xl lg:text-7xl font-heading font-extrabold text-white mb-6 tracking-tighter">
                                Secure Your Spot.
                            </h2>
                            <p className="text-xl text-white/50 mb-14 leading-relaxed max-w-xl mx-auto">
                                We are currently crafting our elite curriculum. Join the waitlist for priority access, early-bird pricing, and exclusive lesson previews.
                            </p>

                            {submitted ? (
                                <div className="p-12 glass-card slide-up">
                                    <div className="flex justify-center mb-8">
                                        <div className="w-20 h-20 bg-primary-orange rounded-full flex items-center justify-center text-white shadow-lg icon-3d">
                                            <HugeiconsIcon icon={Tick02Icon} size={40} />
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-heading font-bold text-white mb-4">You're in the Loop.</h3>
                                    <p className="text-white/70 text-lg leading-relaxed max-w-md mx-auto">
                                        We'll notify you as soon as the first cohort opens. Get ready to master the craft of web engineering.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6 text-left bg-white/5 p-8 lg:p-12 rounded-[40px] border border-white/10 backdrop-blur-md shadow-2xl">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="waitlist-name" className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-3">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="waitlist-name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="John Doe"
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-primary-orange/50 transition-all duration-300"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="waitlist-email" className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-3">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="waitlist-email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="john@example.com"
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-primary-orange/50 transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="waitlist-whatsapp" className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-3">
                                            WhatsApp (For Announcements)
                                        </label>
                                        <input
                                            type="tel"
                                            id="waitlist-whatsapp"
                                            name="whatsapp"
                                            value={formData.whatsapp}
                                            onChange={handleChange}
                                            placeholder="+234..."
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-primary-orange/50 transition-all duration-300"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-5 bg-primary-orange text-white text-lg font-extrabold rounded-2xl hover:brightness-110 shadow-lg transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <HugeiconsIcon icon={Loading03Icon} className="animate-spin h-6 w-6" size={24} />
                                                Processing...
                                            </>
                                        ) : (
                                            'Join the Elite Waitlist'
                                        )}
                                    </button>
                                    <p className="text-[10px] font-bold text-white/20 text-center uppercase tracking-[0.2em] mt-6">
                                        Precision. Performance. Privacy.
                                    </p>
                                </form>
                            )}
                        </div>
                    </ScrollReveal>
                </Container>
            </Section>
        </div>
    );
};

export default EducationPage;
