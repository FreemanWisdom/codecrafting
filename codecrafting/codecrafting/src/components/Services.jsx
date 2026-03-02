import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Computer01Icon, FlashIcon, Configuration01Icon } from '@hugeicons/core-free-icons';
import Section from './Section';
import ScrollReveal from './ScrollReveal';
import Container from './Container';

const ServiceCard = ({ title, description, icon }) => (
    <div className="p-8 bg-white border border-primary-teal/10 rounded-xl hover:shadow-xl transition-shadow duration-300">
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
            title: "Web Development",
            description: "Custom, high-performance websites built with the latest technologies. From landing pages to complex web applications.",
            icon: <HugeiconsIcon icon={Computer01Icon} size={24} />
        },
        {
            title: "Website Redesign & Optimization",
            description: "Transform your existing site with a modern look and improved performance. We optimize for speed, accessibility, and conversion.",
            icon: <HugeiconsIcon icon={FlashIcon} size={24} />
        },
        {
            title: "Deployment & Hosting Setup",
            description: "Hassle-free deployment and reliable hosting solutions. We ensure your website is secure, scalable, and always online.",
            icon: <HugeiconsIcon icon={Configuration01Icon} size={24} />
        }
    ];

    return (
        <Section id="services" background="white">
            <Container>
                <ScrollReveal>
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-sm font-bold text-primary-orange uppercase tracking-widest mb-3">Our Expertise</h2>
                        <h3 className="text-xl lg:text-2xl font-heading font-extrabold text-primary-navy mb-6 tracking-tighter leading-tight">
                            Comprehensive Web Solutions for Growth
                        </h3>
                        <p className="text-lg text-mid-slate">
                            Whether you're starting from scratch or looking to enhance your digital presence,
                            we provide the technical expertise and design thinking to help you succeed.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </div>
                </ScrollReveal>
            </Container>
        </Section>
    );
};

export default Services;
