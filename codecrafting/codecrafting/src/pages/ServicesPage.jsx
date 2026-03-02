import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Tick01Icon } from '@hugeicons/core-free-icons';
import Container from '../components/Container';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import Section from '../components/Section';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import { Link } from 'react-router-dom';
import servicesBg from '../assets/pictures/Workbackground.jpg';

const ServiceSection = ({ title, headline, description, items, deliverables, ctaText, ctaTo, bg = "white" }) => (
    <Section background={bg}>
        <Container>
            <div className="flex flex-col md:flex-row gap-16">
                <div className="lg:w-1/2">
                    <ScrollReveal>
                        <h2 className="text-sm font-bold text-primary-orange uppercase tracking-widest mb-3">{title}</h2>
                        <h3 className="text-3xl lg:text-5xl font-heading font-extrabold text-primary-navy mb-6 tracking-tighter leading-tight">
                            {headline}
                        </h3>
                        <p className="text-lg text-mid-slate mb-10 leading-relaxed">
                            {description}
                        </p>

                        {items && (
                            <div className="grid sm:grid-cols-2 gap-4 mb-10">
                                {items.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-4 bg-soft-blue rounded-xl border border-black/5">
                                        <div className="w-2 h-2 rounded-full bg-primary-orange"></div>
                                        <span className="text-sm font-bold text-primary-navy">{item}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <Button variant="primary" to={ctaTo} className="px-8">{ctaText}</Button>
                    </ScrollReveal>
                </div>
                <div className="lg:w-1/2">
                    <ScrollReveal delay={0.2}>
                        <div className="bg-primary-navy rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-orange/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <h4 className="text-xl font-heading font-bold mb-8 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary-orange flex items-center justify-center text-white icon-3d">
                                    <HugeiconsIcon icon={Tick01Icon} size={18} strokeWidth={2.5} />
                                </span>
                                What You Get
                            </h4>
                            <ul className="space-y-4">
                                {deliverables.map((item, idx) => (
                                    <li key={idx} className="flex gap-4 text-white/70">
                                        <span className="text-primary-orange font-bold text-xl leading-none">•</span>
                                        <span className="text-sm leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </Container>
    </Section>
);

const ServicesPage = () => {
    return (
        <div className="page-enter">
            <PageHero
                title="Professional Web Solutions"
                subtitle="We design and build modern, fast, SEO-ready websites tailored to your business goals."
                badge="Services"
                backgroundImage={servicesBg}
            />

            <Container className="py-8">
                <BackButton />
            </Container>

            {/* Service 1: Custom Builds */}
            <ServiceSection
                title="Custom Builds"
                headline="Professional Websites Built to Convert and Scale"
                description="We design and build modern, fast, SEO-ready websites tailored to your business goals. From corporate identities to custom web applications."
                items={[
                    "Business Corporate Websites",
                    "E-commerce Stores",
                    "SaaS Frontend Platforms",
                    "Booking & Appointment Sites",
                    "NGO / Nonprofit Websites",
                    "Real Estate & Healthcare",
                    "Personal Brand & Portfolios",
                    "Startup MVP Websites"
                ]}
                deliverables={[
                    "Responsive design (mobile-first)",
                    "SEO-ready structure",
                    "Performance optimization",
                    "Clean UI/UX & Interaction Design",
                    "CMS integration (if required)",
                    "Security best practices",
                    "Deployment setup",
                    "30-day post-launch support"
                ]}
                ctaText="Request a Quote"
                ctaTo="/contact"
            />

            {/* Service 2: Redesign */}
            <ServiceSection
                title="Optimization"
                headline="Upgrade Your Existing Website for Impact"
                description="Is your website slow, outdated, or not mobile-friendly? We transform existing assets into modern, high-performance digital products."
                deliverables={[
                    "UI/UX modernization",
                    "Speed & Core Web Vitals optimization",
                    "Mobile responsiveness fixes",
                    "Code refactoring & cleaning",
                    "SEO structure improvements",
                    "Security updates"
                ]}
                ctaText="Improve My Website"
                ctaTo="/contact"
                bg="soft"
            />

            {/* Service 3: Deployment */}
            <ServiceSection
                title="Deployment"
                headline="Seamless Launch & Hosting Configuration"
                description="Launching a website shouldn't be stressful. We handle everything from domain connections to ongoing maintenance."
                deliverables={[
                    "Domain connection & DNS setup",
                    "Hosting setup (Vercel, Netlify, Shared)",
                    "SSL configuration & Security",
                    "CDN setup for global speed",
                    "Ongoing maintenance plans"
                ]}
                ctaText="Get Deployment Support"
                ctaTo="/contact"
            />

            {/* Pricing Section */}
            <Section background="soft">
                <Container>
                    <ScrollReveal>
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-sm font-bold text-primary-orange uppercase tracking-widest mb-3">Pricing Philosophy</h2>
                            <h3 className="text-3xl lg:text-5xl font-heading font-extrabold text-primary-navy mb-6 tracking-tighter">
                                Transparent Pricing
                            </h3>
                            <p className="text-lg text-mid-slate">
                                Our pricing is tailored to the complexity and requirements of your project. We believe in value-driven authority positioning.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    name: "Starter Package",
                                    desc: "1–3 pages. Basic design, mobile responsive, and SEO setup.",
                                    features: ["Responsive Design", "Basic SEO", "Contact Form", "30-Day Support"]
                                },
                                {
                                    name: "Business Package",
                                    desc: "5–10 pages. Advanced UI/UX, CMS, and optimized performance.",
                                    features: ["Advanced UX", "CMS Integration", "Custom Content", "Speed Optimization"],
                                    featured: true
                                },
                                {
                                    name: "Premium Package",
                                    desc: "Custom Web Apps / E-commerce. Payment, booking, and animations.",
                                    features: ["Payment Integration", "Booking Systems", "Custom Logic", "Extended Support"]
                                }
                            ].map((tier, idx) => (
                                <div key={idx} className={`p-10 rounded-3xl bg-white border ${tier.featured ? 'border-primary-orange shadow-2xl relative' : 'border-black/5'} transition-all duration-300`}>
                                    {tier.featured && (
                                        <div className="absolute top-0 right-10 -translate-y-1/2 bg-primary-orange text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">Recommended</div>
                                    )}
                                    <h4 className="text-xl font-heading font-extrabold text-primary-navy mb-2">{tier.name}</h4>
                                    <p className="text-sm text-mid-slate mb-8">{tier.desc}</p>
                                    <ul className="space-y-4 mb-10">
                                        {tier.features.map((feat, fIdx) => (
                                            <li key={fIdx} className="flex gap-3 text-sm font-bold text-primary-navy/70 uppercase tracking-tighter">
                                                <HugeiconsIcon icon={Tick01Icon} size={20} strokeWidth={3} className="text-primary-orange shrink-0" />
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button variant={tier.featured ? "primary" : "outline"} to="/contact" className="w-full">Get Pricing</Button>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 p-8 lg:p-12 bg-primary-navy rounded-3xl text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-orange/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                            <div className="flex flex-col lg:flex-row gap-10 items-center relative z-10">
                                <div className="lg:w-2/3">
                                    <h4 className="text-2xl font-heading font-extrabold mb-4">A Note on Domains & Hosting</h4>
                                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                                        Pricing depends on specific factors like project size, design complexity, and domain choice. Standard domains (.com, .org) follow standard pricing, while premium or country-specific domains (.ng, .uk) vary.
                                    </p>
                                    <p className="text-primary-orange text-xs italic">
                                        *Domain and hosting fees are billed separately from development costs.
                                    </p>
                                </div>
                                <div className="lg:w-1/3 text-center">
                                    <Button variant="white" to="/contact">Get Custom Pricing</Button>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </Container>
            </Section>
        </div>
    );
};

export default ServicesPage;
