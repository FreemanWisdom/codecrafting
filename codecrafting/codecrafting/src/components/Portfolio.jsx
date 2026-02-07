import React, { useState } from 'react';
import Section from './Section';
import Container from './Container';
import Button from './Button';
import ScrollReveal from './ScrollReveal';
import mockup1 from '../assets/pictures/WorkMockup1.jpg';
import mockup2 from '../assets/pictures/WorkMockup2.jpg';
import mockup3 from '../assets/pictures/WorkMockup3.jpg';
import mockup4 from '../assets/pictures/WorkMockup4.jpg';

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 lg:p-12 fade-in">
            <div className="absolute inset-0 bg-primary-navy/90 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl slide-up">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full bg-light-teal/20 text-primary-navy hover:bg-soft-blue/40 transition-colors z-10"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col lg:flex-row h-full">
                    <div className="lg:w-2/3 bg-soft-blue p-8 flex items-center justify-center">
                        <img src={project.image} alt={project.title} className="rounded-xl shadow-lg max-h-[70vh] w-auto object-contain" />
                    </div>
                    <div className="lg:w-1/3 p-10 flex flex-col justify-center">
                        <span className="text-xs font-bold text-primary-orange uppercase tracking-widest mb-2">{project.category}</span>
                        <h3 className="text-xl font-heading font-extrabold text-primary-navy mb-6 tracking-tighter">{project.title}</h3>

                        <div className="p-6 bg-light-teal/10 border border-primary-orange/10 rounded-xl mb-8">
                            <p className="text-sm text-mid-slate italic leading-relaxed">
                                “This is a preview. Full project details will be available at the official launch.”
                            </p>
                        </div>

                        <Button variant="primary" onClick={onClose} className="w-full">
                            Back to Portfolio
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Portfolio = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        { title: "Corporate Identity", image: mockup1, category: "Web Design" },
        { title: "E-learning Platform", image: mockup2, category: "Web Development" },
        { title: "Portfolio Concept", image: mockup3, category: "Optimization" },
        { title: "Business Solution", image: mockup4, category: "Web Design" },
    ];

    return (
        <Section id="work" background="white">
            <Container>
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-primary-orange uppercase tracking-widest mb-3">Our Work</h2>
                        <h3 className="text-2xl lg:text-4xl font-heading font-extrabold text-primary-navy mb-6 tracking-tighter">
                            Proven Results, Exceptionally Crafted
                        </h3>
                        <p className="text-lg text-mid-slate max-w-2xl mx-auto">
                            A small selection of projects that demonstrate our commitment to quality,
                            performance, and clean aesthetic.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-10">
                    {projects.map((project, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <div className="group cursor-pointer" onClick={() => setSelectedProject(project)}>
                                <div className="relative overflow-hidden rounded-2xl shadow-lg border border-soft-blue aspect-video">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-primary-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="bg-white px-6 py-2 rounded-full font-bold text-primary-navy">
                                            View Details
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-end">
                                    <div>
                                        <span className="text-xs font-bold text-primary-orange uppercase tracking-widest">{project.category}</span>
                                        <h4 className="text-base font-heading font-extrabold text-primary-navy mt-2 tracking-tighter">{project.title}</h4>
                                    </div>
                                    <button className="text-sm font-medium text-primary-orange hover:underline">View Details →</button>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </Container>

            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </Section>
    );
};

export default Portfolio;
