import React from 'react';
import Section from './Section';
import ScrollReveal from './ScrollReveal';
import Container from './Container';

const ServiceCard = ({ title, description, icon }) => (
    <div className="p-8 bg-white border border-primary-teal/10 rounded-xl hover:shadow-xl transition-shadow duration-300">
        <div className="w-12 h-12 text-primary-orange mb-6">
            {icon}
        </div>
        <h3 className="text-sm font-heading text-primary-navy mb-4 tracking-tighter">{title}</h3>
        <p className="text-mid-slate leading-relaxed">{description}</p>
    </div>
);

const Services = () => {
    const services = [
        {
            title: "Website Design & Development",
            description: "Custom-built, performant websites tailored to your brand's unique needs. We prioritize clean code and exceptional user experience.",
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: "Website Redesign & Optimization",
            description: "Transform your existing site with a modern look and improved performance. We optimize for speed, accessibility, and conversion.",
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        {
            title: "Deployment & Hosting Setup",
            description: "Hassle-free deployment and reliable hosting solutions. We ensure your website is secure, scalable, and always online.",
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            )
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
