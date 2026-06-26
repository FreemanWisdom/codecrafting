import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Diamond01Icon, RocketIcon, Target01Icon } from '@hugeicons/core-free-icons';
import PageHero from '../components/PageHero';
import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';
import Reveal from '../components/ScrollReveal';
import BackButton from '../components/BackButton';
import ReviewsSection from '../components/ReviewsSection';
import aboutBg from '../assets/pictures/Corporate Globe Wallpaper for Decor.jpg';
import aboutMain from '../assets/pictures/American corporations.jpg';
import TechStack from '../components/TechStack';
import { useSiteContent } from '../hooks/useSiteContent';
import SEO from '../components/SEO';
import { optimizeCloudinaryImage } from '../utils/image';

const AboutPage = () => {
    const { siteContent } = useSiteContent();
    const activeAboutBg = siteContent.about_bg_main || aboutBg;
    const activeSecondImg = siteContent.about_second_image || aboutMain; // portfolio_bg reuse
    const activeLastImg = siteContent.about_last_image || aboutBg;

    return (
        <div className="page-enter">
            <SEO 
                title="About" 
                description="Learn more about CodingGroups, our story, methodology, and how we help businesses grow through technical excellence."
                url="/about"
            />
            <PageHero
                title="Your Partner in Digital Growth"
                subtitle="We combine technical precision with a deep understanding of business goals to build websites that actually work for you."
                badge="About CodingGroups"
                backgroundImage={activeAboutBg}
            />

            <Container className="py-8">
                <BackButton />
            </Container>

            <Section background="white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <Reveal>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-primary-orange/20 rounded-[40px] rotate-3 group-hover:rotate-0 transition-transform duration-700"></div>
                                <img
                                    src={optimizeCloudinaryImage(activeSecondImg, 800)}
                                    alt="Professional Developer at CodingGroups"
                                    loading="lazy"
                                    className="relative z-10 rounded-[40px] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 h-[400px] md:h-[600px] w-full object-cover"
                                />
                                <div className="absolute -bottom-6 -right-6 z-20 bg-primary-navy p-8 rounded-3xl shadow-xl hidden md:block border border-primary-orange/30">
                                    <div className="text-4xl font-heading font-extrabold text-primary-orange mb-1">5+</div>
                                    <div className="text-xs font-bold text-white uppercase tracking-widest">Years of <br />Experience</div>
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-sm font-bold text-primary-orange uppercase tracking-[0.2em] mb-4 text-gradient">Our Story</p>
                            <h2 className="text-display-sm font-heading font-extrabold text-primary-navy mb-10 heading-premium text-balance leading-tight">
                                Crafting Excellence <br />In Every Pixel.
                            </h2>
                            <div className="space-y-6 text-lg text-mid-slate leading-relaxed">
                                <p>
                                    At CodingGroups, we believe that technology should be an enabler, not a barrier. Our journey started with a passion for clean code and a drive to help organizations realize their full digital potential.
                                </p>
                                <p>
                                    Today, we are a dedicated studio that partners with businesses and technical founders to deliver high-quality web solutions that drive real-world impact.
                                </p>
                                <Button variant="primary" to="/contact" className="mt-4">Start Your Journey</Button>
                            </div>
                        </Reveal>
                    </div>
                </Container>
            </Section>

            <Section background="soft" className="section-premium">
                <Container>
                    <div className="flex flex-col md:flex-row gap-20 items-center">
                        <div className="lg:w-1/2">
                            <Reveal>
                                <p className="text-sm font-bold text-primary-orange uppercase tracking-widest mb-4">Our Methodology</p>
                                <h2 className="text-display-sm font-heading font-extrabold text-primary-navy mb-8 tracking-tighter leading-tight text-balance">
                                    Engineering with <br /> <span className="text-gradient">a Business Mindset.</span>
                                </h2>
                                <div className="space-y-6 text-xl text-mid-slate leading-relaxed">
                                    <p>
                                        CodingGroups started with a simple belief: a website shouldn't just look good—it should solve a problem. Whether that's automating a complex workflow, capturing more leads for a scaling business, or helping a founder launch a new product.
                                    </p>
                                    <p>
                                        Our approach is based on precision, transparency, and results. We bridge the gap between complex technology and your real-world business needs.
                                    </p>
                                    <div className="pt-10 border-t border-black/5 grid grid-cols-2 gap-12">
                                        <div>
                                            <h4 className="font-heading font-bold text-primary-navy mb-4 text-lg">Our Values</h4>
                                            <ul className="text-sm space-y-3">
                                                <li className="flex gap-3 items-center"><div className="w-2 h-2 rounded-full bg-primary-orange"></div> Speed & Performance</li>
                                                <li className="flex gap-3 items-center"><div className="w-2 h-2 rounded-full bg-primary-orange"></div> Clear Communication</li>
                                                <li className="flex gap-3 items-center"><div className="w-2 h-2 rounded-full bg-primary-orange"></div> Results-First Design</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-heading font-bold text-primary-navy mb-4 text-lg">Our Focus</h4>
                                            <ul className="text-sm space-y-3">
                                                <li className="flex gap-3 items-center"><div className="w-2 h-2 rounded-full bg-primary-orange"></div> Scaling Startups</li>
                                                <li className="flex gap-3 items-center"><div className="w-2 h-2 rounded-full bg-primary-orange"></div> SaaS Platforms</li>
                                                <li className="flex gap-3 items-center"><div className="w-2 h-2 rounded-full bg-primary-orange"></div> Technical Founders</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                        <div className="lg:w-1/2">
                            <Reveal delay={0.2}>
                                <div className="relative p-6 glass rounded-[50px] shadow-premium group">
                                    <div className="absolute inset-0 bg-primary-orange/5 rounded-[50px] group-hover:scale-110 transition-transform duration-1000"></div>
                                    <img
                                        src={optimizeCloudinaryImage(activeLastImg, 800)}
                                        alt="CodingGroups Digital Studio Environment"
                                        loading="lazy"
                                        className="relative z-10 w-full h-auto rounded-[40px] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                                    />
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </Container>
            </Section>

            <Section background="white" className="section-premium">
                <Container>
                    <Reveal>
                        <div className="text-center max-w-3xl mx-auto mb-24">
                            <p className="text-sm font-bold text-primary-orange uppercase tracking-widest mb-4">How We Work</p>
                            <h2 className="text-display-md font-heading font-extrabold text-primary-navy mb-8 tracking-tighter text-balance">
                                A Streamlined Process
                            </h2>
                            <p className="text-xl text-mid-slate leading-relaxed">
                                We've refined our execution to be fast, transparent, and focused on your goals.
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3">
                        {[
                            {
                                step: '01',
                                title: 'Discovery',
                                desc: 'We dive deep into your goals, audience, and technical needs to create a strategic roadmap.',
                                icon: <HugeiconsIcon icon={Target01Icon} size={28} />,
                            },
                            {
                                step: '02',
                                title: 'Crafting',
                                desc: 'We engineer your solution using modern tech to ensure it\'s fast, secure, and future-proof.',
                                icon: <HugeiconsIcon icon={Diamond01Icon} size={28} />,
                            },
                            {
                                step: '03',
                                title: 'Launch',
                                desc: 'We deploy with precision and provide the tools you need to manage your new asset.',
                                icon: <HugeiconsIcon icon={RocketIcon} size={28} />,
                            },
                        ].map((item, idx) => (
                            <Reveal key={item.step} delay={idx * 0.1}>
                                <div className="bg-white p-12 rounded-[50px] border border-black/5 shadow-sm hover:shadow-premium transition-all duration-500 group relative overflow-hidden">
                                    <div className="absolute -top-10 -right-10 text-9xl font-heading font-black text-primary-navy/5 group-hover:text-primary-orange/5 transition-colors">{item.step}</div>
                                    <div className="w-16 h-16 bg-authority-navy/5 text-primary-orange rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-2xl font-heading font-bold text-primary-navy mb-4">{item.title}</h4>
                                    <p className="text-mid-slate leading-relaxed">{item.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </Container>
            </Section>

            <TechStack />

            <ReviewsSection
                background="soft"
                heading="Approved Reviews"
                title="What clients say after launch."
                description="Recent approved feedback from clients who trusted CodingGroups to turn ideas into polished, production-ready experiences."
            />

            <Section background="mesh" className="section-premium relative overflow-hidden pb-48">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
                <Container>
                    <Reveal>
                        <div className="max-w-5xl mx-auto text-center p-20 md:p-32 glass-premium rounded-[80px] border-white/10 shadow-premium relative overflow-hidden">
                            <h2 className="text-display-md font-heading font-extrabold text-white mb-12 heading-premium tracking-tighter text-balance">Ready to Scale <br /><span className="text-gradient">Your Digital Presence?</span></h2>
                            <p className="text-2xl text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed">Whether you're a business owner or a technical founder, we're here to engineer your digital authority.</p>
                            <div className="flex flex-col sm:flex-row gap-8 justify-center">
                                <Button variant="primary" to="/contact" className="px-20 py-8 text-2xl font-black shadow-3xl shadow-primary-orange/30 hover:scale-105 transition-all">Start a Project</Button>
                                <Button variant="outline" to="/portfolio" className="px-20 py-8 text-2xl font-black border-white/20! text-white! hover:bg-white/10! transition-all">View Showcase</Button>
                            </div>
                        </div>
                    </Reveal>
                </Container>
            </Section>
        </div>
    );
};

export default AboutPage;
