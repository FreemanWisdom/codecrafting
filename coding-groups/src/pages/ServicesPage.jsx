import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Tick01Icon } from '@hugeicons/core-free-icons';
import Container from '../components/Container';
import PageHero from '../components/PageHero';
import Reveal from '../components/ScrollReveal';
import Section from '../components/Section';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import servicesBg from '../assets/pictures/Workbackground.jpg';
import { useSiteContent } from '../hooks/useSiteContent';
import SEO from '../components/SEO';

const ServiceSection = ({ title, headline, description, items, deliverables, ctaText, ctaTo, bg = "white", reverse = false }) => (
    <Section background={bg} className="section-premium">
        <Container>
            <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 lg:gap-24 items-center`}>
                <div className="lg:w-1/2">
                    <Reveal>
                        <p className="text-sm font-bold text-primary-orange uppercase tracking-[0.2em] mb-4 text-gradient">{title}</p>
                        <h2 className="text-display-md font-heading font-extrabold text-primary-navy mb-8 heading-premium text-balance tracking-tighter leading-tight">
                            {headline}
                        </h2>
                        <p className="text-xl text-mid-slate mb-12 leading-relaxed font-medium text-balance">
                            {description}
                        </p>

                        {items && (
                            <div className="grid sm:grid-cols-2 gap-4 mb-12">
                                {items.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-5 bg-white border-premium rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                        <div className="w-2.5 h-2.5 rounded-full bg-primary-orange shadow-sm opacity-60"></div>
                                        <span className="text-sm font-black text-primary-navy uppercase tracking-tighter">{item}</span>
                                    </div>
                                ))}
                            </div>
                        )}



                        <Button variant="primary" to={ctaTo} className="px-12 py-5 text-lg font-black shadow-xl shadow-primary-orange/20 rotate-1 hover:rotate-0 transition-all">{ctaText}</Button>
                    </Reveal>
                </div>
                <div className="lg:w-1/2 w-full">
                    <Reveal delay={0.2}>
                        <div className="bg-primary-navy rounded-[60px] p-8 md:p-14 lg:p-20 text-white relative overflow-hidden border-premium shadow-premium">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-primary-orange/20 rounded-full blur-[100px] -mr-40 -mt-40 opacity-40"></div>
                            <h4 className="text-3xl font-heading font-extrabold mb-12 flex items-center gap-6 heading-premium">
                                <span className="w-14 h-14 rounded-2xl bg-primary-orange flex items-center justify-center text-white icon-3d shadow-xl shadow-primary-orange/30">
                                    <HugeiconsIcon icon={Tick01Icon} size={28} strokeWidth={3} />
                                </span>
                                Core Deliverables
                            </h4>
                            <ul className="space-y-8">
                                {deliverables.map((item, idx) => (
                                    <li key={idx} className="flex gap-6 text-white/80 items-start group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-orange mt-2.5 group-hover:scale-150 transition-transform duration-300"></div>
                                        <span className="text-lg leading-relaxed font-bold tracking-tight">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                </div>
            </div>
        </Container>
    </Section>
);

const ServicesPage = () => {
    const { siteContent } = useSiteContent();
    const activeServicesBg = siteContent.services_bg || servicesBg;
    const activeHeadline = siteContent.services_headline || "Web Design & Development Services";
    const activeDescription = siteContent.services_description || "We build fast, modern websites and web apps for businesses, startups, schools, and creators.";

    return (
        <div className="page-enter">
            <SEO 
                title="Services" 
                description="Explore our web development, branding, and digital hub services tailored to scale your business profile."
                url="/services"
            />
            <PageHero
                title={activeHeadline}
                subtitle={activeDescription}
                badge="Services"
                backgroundImage={activeServicesBg}
            />

            <Container className="py-8">
                <BackButton />
            </Container>

            {/* Service 1: Business Websites */}
            <ServiceSection
                title="Business Websites"
                headline="Professional Websites that Build Trust"
                description="Your website is often the first impression you make. We build fast, professional websites designed to help you attract customers and grow your business online."
                items={[
                    "Company Websites",
                    "School Websites",
                    "Portfolio Websites",
                    "Landing Pages",
                    "E-commerce Stores",
                    "Booking Systems"
                ]}
                deliverables={[
                    "Mobile-Friendly Design",
                    "Google Search Ready",
                    "Fast Load Speeds",
                    "Clear Call-to-Actions",
                    "Secure Contact Forms",
                    "Easy-to-use Layout"
                ]}
                ctaText="Get a Website"
                ctaTo="/contact"
            />

            {/* Service 2: SaaS & Platform Engineering */}
            <ServiceSection
                title="Custom Web Apps & Dashboards"
                headline="Systems that Run Your Business"
                description="We build custom systems that manage users, payments, bookings, reports, and your day-to-day operations so you can focus on growth."
                reverse={true}
                items={[
                    "Admin Dashboards",
                    "User Portals",
                    "CRM Systems",
                    "Payment Integration",
                    "API Integrations",
                    "Role-Based Systems"
                ]}
                deliverables={[
                    "Secure Login & Roles",
                    "Custom Dashboards",
                    "Payment Processing",
                    "Data Reporting",
                    "Business Automation",
                    "Third-party Integrations"
                ]}
                ctaText="Start a Project"
                ctaTo="/contact"
                bg="soft"
            />

            {/* Service 3: Brand Identity & Portfolios */}
            <ServiceSection
                title="Branding & Digital Presence"
                headline="Look Professional & Consistent Online"
                description="We help businesses establish a cohesive and professional visual identity online, ensuring you look great everywhere your customers find you."
                deliverables={[
                    "Brand Identity",
                    "Portfolio Design",
                    "Social Media Integration",
                    "Motion Graphics",
                    "UI/UX Improvements",
                    "Brand Guidelines"
                ]}
                ctaText="Book a Brand Audit"
                ctaTo="/contact"
            />

            {/* Pricing Section - Simpified for personal touch */}
            <Section background="soft">
                <Container>
                    <Reveal>
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <p className="text-sm font-bold text-primary-orange uppercase tracking-widest mb-3">Investment</p>
                            <h2 className="text-display-sm font-heading font-extrabold text-primary-navy mb-6 tracking-tighter text-balance">
                                Professional Pricing for Real Value
                            </h2>
                            <p className="text-lg text-mid-slate">
                                We offer transparent pricing based on the scope and impact of your project.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 items-stretch">
                            {[
                                {
                                    name: "Starter Package",
                                    desc: "For individuals and new businesses. A simple, professional presence online. Includes 1–3 pages, mobile responsiveness, and basic setup.",
                                    features: ["Responsive Design", "Basic SEO", "Contact Form", "30-Day Support"]
                                },
                                {
                                    name: "Business Package",
                                    desc: "For growing businesses that need more. A comprehensive site with 5–10 pages, easy content management, and fast performance.",
                                    features: ["Advanced UX", "CMS Integration", "Custom Content", "Speed Optimization"],
                                    featured: true
                                },
                                {
                                    name: "Premium Package",
                                    desc: "For complex systems and e-commerce. Custom web apps and full stores. Includes payment processing and specialized functionality.",
                                    features: ["Payment Integration", "Booking Systems", "Custom Logic", "Extended Support"]
                                }
                            ].map((tier, idx) => (
                                <div key={idx} className={`p-12 md:p-14 rounded-[50px] bg-white border border-black/5 flex flex-col h-full ${tier.featured ? 'shadow-premium relative z-10 border-primary-orange/20' : 'hover:shadow-premium'} transition-all duration-700 group`}>
                                    {tier.featured && (
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-orange text-white text-[10px] font-black uppercase tracking-[0.3em] px-8 py-3 rounded-full shadow-2xl">Most Popular</div>
                                    )}
                                    <div className="mb-auto">
                                        <h4 className="text-3xl font-heading font-extrabold text-primary-navy mb-4 heading-premium">{tier.name}</h4>
                                        <p className="text-base text-mid-slate mb-12 leading-relaxed font-medium">{tier.desc}</p>
                                        <ul className="space-y-6 mb-16">
                                            {tier.features.map((feat, fIdx) => (
                                                <li key={fIdx} className="flex gap-5 text-sm font-bold text-primary-navy/70 uppercase tracking-tight">
                                                    <div className="w-5 h-5 rounded-full bg-primary-orange/10 flex items-center justify-center text-primary-orange shrink-0">
                                                        <HugeiconsIcon icon={Tick01Icon} size={12} strokeWidth={4} />
                                                    </div>
                                                    {feat}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <Button variant={tier.featured ? "primary" : "outline"} to="/contact" className="w-full py-6 text-xl font-black shadow-2xl">Contact Us</Button>
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
                                    <Button variant="white" to="/contact">Contact Us</Button>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </Container>
            </Section>
        </div>
    );
};

export default ServicesPage;
