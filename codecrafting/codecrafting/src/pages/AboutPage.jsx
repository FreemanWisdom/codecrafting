import React, { useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { RulerIcon, Diamond01Icon, FireIcon } from '@hugeicons/core-free-icons';
import PageHero from '../components/PageHero';
import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';
import ScrollReveal from '../components/ScrollReveal';
import BackButton from '../components/BackButton';
import aboutBg from '../assets/pictures/Corporate Globe Wallpaper for Decor.jpg';

const AboutPage = () => {
    useEffect(() => {
        document.title = 'About — CodeCrafting';
    }, []);

    const values = [
        {
            title: "Precision Engineering",
            desc: "We don't just write code; we architect systems that are performant, scalable, and maintainable.",
            icon: <HugeiconsIcon icon={RulerIcon} size={48} className="text-primary-orange icon-3d" />
        },
        {
            title: "Elite Design",
            desc: "Our design language is built on clarity, depth, and Authority branding. We create to impress.",
            icon: <HugeiconsIcon icon={Diamond01Icon} size={48} className="text-primary-orange icon-3d" />
        },
        {
            title: "Practical Mastery",
            desc: "In our education wing, we focus on real-world skills that move the needle. No fluff.",
            icon: <HugeiconsIcon icon={FireIcon} size={48} className="text-primary-orange icon-3d" />
        }
    ];

    return (
        <div className="page-enter">
            <PageHero
                badge="Elite Studio"
                title="Engineering Digital Authority"
                subtitle="We are a high-end digital studio and a practical learning hub dedicated to technical excellence."
                backgroundImage={aboutBg}
            />

            <Container className="py-8">
                <BackButton />
            </Container>

            {/* Mission & Vision */}
            <Section background="white">
                <Container>
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <ScrollReveal>
                                <h2 className="text-sm font-bold text-primary-orange uppercase tracking-widest mb-3">Our Mission</h2>
                                <h3 className="text-3xl lg:text-5xl font-heading font-extrabold text-primary-navy mb-8 tracking-tighter leading-tight">
                                    Crafting the Future of the <br /> <span className="text-primary-orange">Web Ecosystem.</span>
                                </h3>
                                <div className="space-y-6 text-mid-slate text-lg leading-relaxed">
                                    <p>
                                        CodeCrafting was founded on the principle that digital presence should be an asset, not a liability. We bridge the gap between complex engineering and intuitive user experiences.
                                    </p>
                                    <p>
                                        Whether we are building a high-performance corporate platform or training the next generation of frontend engineers, our standard remains the same: <span className="text-primary-navy font-bold">Excellence by Default.</span>
                                    </p>
                                </div>
                            </ScrollReveal>
                        </div>
                        <div className="lg:w-1/2">
                            <ScrollReveal delay={0.2}>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary-orange/5 rounded-[40px] rotate-2 translate-x-4 translate-y-4"></div>
                                    <div className="relative bg-primary-navy rounded-[40px] p-12 overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-orange/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                                        <h4 className="text-2xl font-heading font-extrabold text-white mb-6">The Studio Spirit</h4>
                                        <p className="text-white/60 mb-8 leading-relaxed text-base">
                                            We operate as a small, focused team of craftsmen. We don't take every project; we take the ones where we can make a significant impact. Quality is our only metric.
                                        </p>
                                        <div className="flex flex-wrap gap-4">
                                            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/80 text-xs font-bold uppercase tracking-widest">Fast Execution</div>
                                            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/80 text-xs font-bold uppercase tracking-widest">Modern Stack</div>
                                            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/80 text-xs font-bold uppercase tracking-widest">Pixel Perfect</div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Core Values */}
            <Section background="soft">
                <Container>
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-sm font-bold text-primary-orange uppercase tracking-widest mb-3">Our DNA</h2>
                            <h3 className="text-3xl lg:text-5xl font-heading font-extrabold text-primary-navy mb-6 tracking-tighter">
                                CodeCrafting Values
                            </h3>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {values.map((item, index) => (
                                <div key={index} className="p-10 bg-white rounded-3xl border border-black/5 hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-2xl group text-center">
                                    <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500 inline-block">{item.icon}</div>
                                    <h4 className="text-2xl font-heading font-extrabold text-primary-navy mb-4 tracking-tighter">{item.title}</h4>
                                    <p className="text-mid-slate leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </Container>
            </Section>

            {/* CTA */}
            <Section background="navy">
                <Container>
                    <ScrollReveal>
                        <div className="text-center py-10">
                            <h2 className="text-4xl lg:text-6xl font-heading font-extrabold text-white mb-8 tracking-tighter">
                                Ready to join our <br /> <span className="text-primary-orange">Journey?</span>
                            </h2>
                            <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">
                                Whether you're a business owner or an aspiring developer, there's a place for you in the CodeCrafting ecosystem.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-5 justify-center">
                                <Button variant="primary" to="/contact" className="px-10 py-4">Hire the Studio</Button>
                                <Button variant="outline" to="/education" className="px-10 py-4 border-white/20! text-white! hover:bg-white/10!">Learn with Us</Button>
                            </div>
                        </div>
                    </ScrollReveal>
                </Container>
            </Section>
        </div>
    );
};

export default AboutPage;
