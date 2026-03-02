import React from 'react';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon, ComputerIcon, FlashIcon, Configuration01Icon, SquareIcon, SourceCodeIcon, Diamond01Icon, FireIcon, GlobalEducationIcon } from '@hugeicons/core-free-icons';
import Container from '../components/Container';
import Button from '../components/Button';
import ScrollReveal from '../components/ScrollReveal';
import Section from '../components/Section';
import homeHeader from '../assets/pictures/Homeheader.jpg';
import mockup1 from '../assets/pictures/WorkMockup1.jpg';
import mockup2 from '../assets/pictures/WorkMockup2.jpg';
import mockup3 from '../assets/pictures/WorkMockup3.jpg';

const HomePage = () => {
    return (
        <div className="page-enter">
            {/* Hero */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${homeHeader})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: '1'
                    }}
                >
                </div>

                <Container className="relative z-10">
                    <ScrollReveal>
                        <div className="max-w-4xl glass-card p-8 md:p-12 lg:p-16">
                            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-heading font-extrabold text-white leading-[1.2] mb-8 tracking-tighter">
                                We Build High-Performance <br />
                                <span className="text-primary-orange">Websites</span> & Train Future Developers.
                            </h1>
                            <p className="text-xl sm:text-2xl text-white mb-10 leading-relaxed max-w-2xl font-medium">
                                Professional web development for businesses and practical skill mastery for aspiring developers. We don't just build; we craft digital success.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <Button variant="primary" to="/contact" className="px-12 py-4 text-lg bg-primary-orange text-white hover:scale-105 transition-transform">
                                    Let's Build
                                </Button>
                                <Button variant="outline" to="/education" className="px-12 py-4 font-bold text-lg border-white text-white hover:bg-white/10 backdrop-blur-sm">
                                    Join Learning Waitlist
                                </Button>
                            </div>
                        </div>
                    </ScrollReveal>
                </Container>
            </section>

            {/* Who Is This For */}
            <Section background="white">
                <Container>
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <ScrollReveal>
                                <h2 className="text-sm font-bold text-primary-orange uppercase tracking-widest mb-3">Who Is This For</h2>
                                <h3 className="text-3xl lg:text-5xl font-heading font-extrabold text-primary-navy mb-8 tracking-tighter leading-tight">
                                    Tailored Solutions for Visionaries
                                </h3>
                                <div className="space-y-8">
                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-12 h-12 bg-primary-orange/10 rounded-lg flex items-center justify-center text-primary-orange">
                                            <HugeiconsIcon icon={SquareIcon} size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-heading font-bold text-primary-navy mb-2">Businesses & Startups</h4>
                                            <p className="text-mid-slate leading-relaxed">Looking for a premium, fast, and conversion-focused digital home that scales with your growth.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-12 h-12 bg-primary-orange/10 rounded-lg flex items-center justify-center text-primary-orange">
                                            <HugeiconsIcon icon={SquareIcon} size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-heading font-bold text-primary-navy mb-2">Aspiring Developers</h4>
                                            <p className="text-mid-slate leading-relaxed">Ready to skip the fluff and master real-world Web development through hands-on practice.</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                        <div className="lg:w-1/2">
                            <ScrollReveal delay={0.2}>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary-orange/5 rounded-3xl -rotate-3 translate-x-4 translate-y-4"></div>
                                    <div className="relative bg-primary-navy rounded-3xl p-10 overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-orange/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary-orange/30 transition-colors"></div>
                                        <h4 className="text-3xl font-heading font-extrabold text-white mb-6 leading-tight">Professional Services. <br /><span className="text-primary-orange font-bold text-2xl">Elite UX Standards.</span></h4>
                                        <p className="text-white/60 mb-8 leading-relaxed">We operate as a high-end digital studio and a practical learning hub. No mediocre results, no shallow learning. Just craftsmanship.</p>
                                        <Link to="/about" className="inline-flex items-center gap-2 text-primary-orange font-bold hover:gap-4 transition-all duration-300">
                                            Learn More About Us <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
                                        </Link>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Services Overview */}
            <Section id="services-overview" background="soft">
                <Container>
                    <ScrollReveal>
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-sm font-bold text-primary-orange uppercase tracking-widest mb-3">Our Expertise</h2>
                            <h3 className="text-3xl lg:text-5xl font-heading font-extrabold text-primary-navy mb-6 tracking-tighter leading-tight">
                                High-Conversion Web Services
                            </h3>
                            <p className="text-lg text-mid-slate">
                                We position your business for success with enterprise-level design and scalable architecture.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {[
                                {
                                    title: "Web Design & Development",
                                    description: "Custom corporate websites, e-commerce stores, and SaaS platforms built for speed and impact.",
                                    icon: <HugeiconsIcon icon={ComputerIcon} size={28} />
                                },
                                {
                                    title: "Redesign & Optimization",
                                    description: "Upgrade your existing digital products for performance, accessibility, and modern aesthetics.",
                                    icon: <HugeiconsIcon icon={FlashIcon} size={28} />
                                },
                                {
                                    title: "Deployment & Maintenance",
                                    description: "Seamless launch strategies, hosting configuration, and ongoing technical support for peace of mind.",
                                    icon: <HugeiconsIcon icon={Configuration01Icon} size={28} />
                                }
                            ].map((service, index) => (
                                <div key={index} className="p-8 bg-white rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-black/5 group">
                                    <div className="w-14 h-14 bg-primary-orange/20 text-primary-orange rounded-2xl flex items-center justify-center shrink-0 mb-8 group-hover:bg-primary-orange group-hover:text-white transition-all duration-500 icon-3d">
                                        <div className="w-7 h-7">{service.icon}</div>
                                    </div>
                                    <h3 className="text-xl font-heading font-extrabold text-primary-navy mb-4 tracking-tighter">{service.title}</h3>
                                    <p className="text-mid-slate leading-relaxed text-sm mb-6">{service.description}</p>
                                    <Link to="/services" className="text-sm font-bold text-primary-orange hover:gap-3 transition-all flex items-center gap-2">
                                        Details <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </Container>
            </Section>

            {/* Why CodeCrafting */}
            <Section background="white">
                <Container>
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-sm font-bold text-primary-orange uppercase tracking-widest mb-3">Why Choose Us</h2>
                            <h3 className="text-3xl lg:text-5xl font-heading font-extrabold text-primary-navy mb-6 tracking-tighter">
                                The CodeCrafting Edge
                            </h3>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { title: "Precision Engineering", desc: "Every line of code is written with performance and scalability as the priority.", icon: <HugeiconsIcon icon={SourceCodeIcon} size={32} /> },
                                { title: "Enterprise UX", desc: "We design experiences that feel premium, intuitive, and conversion-focused.", icon: <HugeiconsIcon icon={Diamond01Icon} size={32} /> },
                                { title: "Authority Branding", desc: "We position your brand as an industry leader through modern digital aesthetics.", icon: <HugeiconsIcon icon={FireIcon} size={32} /> },
                                { title: "Practical Mastery", desc: "Our education wing focuses on actual skills, not just theories or certificates.", icon: <HugeiconsIcon icon={GlobalEducationIcon} size={32} /> }
                            ].map((item, index) => (
                                <div key={index} className="p-8 rounded-2xl bg-soft-blue border border-black/5 hover:-translate-y-2 transition-all duration-500 group">
                                    <div className="text-4xl mb-6 text-primary-orange group-hover:scale-110 transition-transform icon-3d">{item.icon}</div>
                                    <h4 className="text-xl font-heading font-bold text-primary-navy mb-3 tracking-tight">{item.title}</h4>
                                    <p className="text-mid-slate text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </Container>
            </Section>

            {/* Featured Projects */}
            <Section background="soft">
                <Container>
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-sm font-bold text-primary-orange uppercase tracking-widest mb-3">Portfolio</h2>
                            <h3 className="text-3xl lg:text-5xl font-heading font-extrabold text-primary-navy mb-6 tracking-tighter">
                                Proven Digital Craftsmanship
                            </h3>
                            <p className="text-lg text-mid-slate max-w-2xl mx-auto">
                                A selection of high-performance websites built for impact and scale.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {[
                            { title: "Corporate Business Solutions", image: mockup1, category: "Web Design" },
                            { title: "E-commerce Architecture", image: mockup2, category: "Full-Stack" },
                            { title: "SaaS Interface Design", image: mockup3, category: "UI/UX" },
                        ].map((project, index) => (
                            <ScrollReveal key={index} delay={index * 0.1}>
                                <div className="group">
                                    <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-video">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-primary-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center">
                                            <span className="text-sm font-bold text-primary-orange mb-2">{project.category}</span>
                                            <h4 className="text-white font-heading font-bold mb-4">{project.title}</h4>
                                            <span className="bg-white px-6 py-2 rounded-full font-bold text-primary-navy text-xs uppercase tracking-widest">
                                                Case Study Soon
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <h4 className="text-lg font-heading font-extrabold text-primary-navy tracking-tighter">{project.title}</h4>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal>
                        <div className="text-center">
                            <Button variant="outline" to="/portfolio" className="border-primary-navy/10 text-primary-navy hover:bg-primary-navy hover:text-white flex items-center gap-2">
                                View Full Portfolio <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                            </Button>
                        </div>
                    </ScrollReveal>
                </Container>
            </Section>

            {/* Final CTA */}
            <Section background="white">
                <Container className="relative overflow-hidden py-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-orange/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-orange/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

                    <ScrollReveal>
                        <div className="text-center py-10 relative z-10">
                            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold text-navy mb-8 tracking-tighter">
                                Step Into the <br /> <span className="text-primary-orange">Next Level</span> of Digital.
                            </h2>
                            <p className="text-xl sm:text-2xl text-navy/50 mb-12 max-w-2xl mx-auto leading-relaxed">
                                Whether you need a powerful business website or want to master the art of Web development, CodeCrafting is your partner.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-5 justify-center">
                                <Button variant="primary" to="/contact" className="px-10 py-4 text-lg  border-white/20 text-navy!">
                                    Request a Quote
                                </Button>
                                <Button variant="outline" to="/education" className="px-10 py-4 text-lg border-bg-primary-orange text-navy!">Join the Waitlist</Button>
                            </div>
                        </div>
                    </ScrollReveal>
                </Container>
            </Section>
        </div>
    );
};

export default HomePage;
