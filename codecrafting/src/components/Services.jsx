import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { BrowserIcon, Target01Icon, MagicWand01Icon } from '@hugeicons/core-free-icons';
import Section from './Section';
import ScrollReveal from './ScrollReveal';
import Container from './Container';

const ServiceCard = ({ title, description, icon }) => (
    <div className="p-8 bg-white border border-primary-teal/10 rounded-xl hover:shadow-xl transition-all duration-300 review-card">
        <div className="w-12 h-12 text-primary-orange mb-6 icon-3d">
            {icon}
        </div>
        <h3 className="text-sm font-heading text-primary-navy mb-4 tracking-tighter">{title}</h3>
        <p className="text-mid-slate leading-relaxed">{description}</p>
    </div>
);

const Services = () => {
    const services = [
        {
            title: "Business Platforms",
            description: "Fast, SEO-optimized sites designed to capture leads, build authority, and drive revenue for your business.",
            icon: <HugeiconsIcon icon={BrowserIcon} size={24} />
        },
        {
            title: "SaaS & Platforms",
            description: "Scalable architectures for digital products. We build complex systems that grow with your user base.",
            icon: <HugeiconsIcon icon={Target01Icon} size={24} />
        },
        {
            title: "Brand Identity",
            description: "Visual excellence and strategic digital storytelling. We build portfolios that establish authority.",
            icon: <HugeiconsIcon icon={MagicWand01Icon} size={24} />
        }
    ];

    return (
        <Section id="services" background="white">
            <Container>
                <div className="max-w-3xl mb-16">
                    <ScrollReveal variant="fade-right">
                        <h2 className="text-sm font-bold text-primary-orange uppercase tracking-widest mb-3">Our Expertise</h2>
                        <h3 className="text-xl lg:text-2xl font-heading font-extrabold text-primary-navy mb-6 tracking-tighter leading-tight">
                            Comprehensive Web Solutions for Growth
                        </h3>
                        <p className="text-lg text-mid-slate">
                            Whether you're starting from scratch or looking to enhance your digital presence,
                            we provide the technical expertise and design thinking to help you succeed.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {services.map((service, index) => (
                        <ScrollReveal key={index} delay={index * 0.15} variant="fade-up">
                            <ServiceCard {...service} />
                        </ScrollReveal>
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default Services;
