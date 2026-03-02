import React, { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon } from '@hugeicons/core-free-icons';
import PageHero from '../components/PageHero';
import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';
import ScrollReveal from '../components/ScrollReveal';
import BackButton from '../components/BackButton';
import portfolioBg from '../assets/pictures/American corporations.jpg';
import mockup1 from '../assets/pictures/WorkMockup1.jpg';
import mockup2 from '../assets/pictures/WorkMockup2.jpg';
import mockup3 from '../assets/pictures/WorkMockup3.jpg';
import mockup4 from '../assets/pictures/WorkMockup4.jpg';

const projects = [
    {
        title: "Corporate Business Solutions",
        image: mockup1,
        category: "Web Design",
        tech: ["React", "Tailwind CSS", "Vite"],
        description: "A high-performance corporate platform designed for authority positioning and seamless user engagement."
    },
    {
        title: "E-commerce Architecture",
        image: mockup2,
        category: "Full-Stack",
        tech: ["React", "Node.js", "MongoDB"],
        description: "A scalable digital storefront with advanced filtering, secure checkout, and real-time inventory tracking."
    },
    {
        title: "SaaS Interface Design",
        image: mockup3,
        category: "UI/UX",
        tech: ["Redux", "SCSS", "JavaScript"],
        description: "A complex dashboard interface focused on data visualization and intuitive workflow management."
    },
    {
        title: "Real Estate Portal",
        image: mockup4,
        category: "Web App",
        tech: ["React", "Firebase", "Tailwind"],
        description: "A property listing platform with dynamic search, map integration, and user authentication."
    }
];

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 lg:p-12 fade-in">
            <div className="absolute inset-0 bg-primary-navy/95 backdrop-blur-md" onClick={onClose}></div>
            <div className="relative bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl slide-up overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-3 rounded-full bg-primary-navy/5 text-primary-navy hover:bg-primary-orange hover:text-white transition-all duration-300 z-10 icon-3d"
                >
                    <HugeiconsIcon icon={Cancel01Icon} size={24} strokeWidth={2.5} />
                </button>

                <div className="flex flex-col md:flex-row h-full">
                    <div className="lg:w-3/5 bg-soft-blue p-8 lg:p-12 flex items-center justify-center border-r border-black/5">
                        <img src={project.image} alt={project.title} className="rounded-2xl shadow-2xl max-h-[60vh] w-auto object-contain hover:scale-[1.02] transition-transform duration-500" />
                    </div>
                    <div className="lg:w-2/5 p-10 lg:p-14 flex flex-col justify-center">
                        <span className="text-xs font-bold text-primary-orange uppercase tracking-widest mb-4 inline-block bg-primary-orange/5 px-3 py-1 rounded-full">{project.category}</span>
                        <h3 className="text-3xl font-heading font-extrabold text-primary-navy mb-6 tracking-tighter leading-tight">{project.title}</h3>
                        <p className="text-mid-slate text-base mb-8 leading-relaxed font-medium">{project.description}</p>

                        <div className="mb-8">
                            <h4 className="text-xs font-bold text-primary-navy uppercase tracking-widest mb-4">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="px-4 py-2 bg-primary-navy/5 text-primary-navy text-xs font-bold rounded-xl border border-black/5">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 bg-primary-orange/5 border border-primary-orange/10 rounded-2xl mb-10">
                            <p className="text-sm text-primary-navy font-bold italic leading-relaxed text-center">
                                Case study and live link coming soon.
                            </p>
                        </div>

                        <Button variant="primary" onClick={onClose} className="w-full py-4 text-lg">
                            Close Preview
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PortfolioPage = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        document.title = 'Portfolio — CodeCrafting';
    }, []);

    return (
        <div className="page-enter">
            <PageHero
                badge="Showcase"
                title="Proven Craftsmanship"
                subtitle="A selection of high-performance digital products engineered for impact and scale."
                backgroundImage={portfolioBg}
            />

            <Container className="py-10">
                <BackButton />
            </Container>

            <Section background="white">
                <Container>
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                        {projects.map((project, index) => (
                            <ScrollReveal key={index} delay={index * 0.1}>
                                <div className="group cursor-pointer" onClick={() => setSelectedProject(project)}>
                                    <div className="relative overflow-hidden rounded-3xl shadow-xl lg:shadow-2xl aspect-video bg-soft-blue border border-black/5">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-primary-navy/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
                                            <span className="text-sm font-bold text-primary-orange mb-3 tracking-widest uppercase">{project.category}</span>
                                            <h4 className="text-2xl font-heading font-extrabold text-white mb-6 tracking-tighter">{project.title}</h4>
                                            <div className="bg-white text-primary-navy px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                View Case Study
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 px-2">
                                        <div className="flex items-center justify-between gap-4 mb-4">
                                            <h4 className="text-2xl font-heading font-extrabold text-primary-navy tracking-tighter">{project.title}</h4>
                                            <div className="flex gap-1.5 flex-wrap justify-end">
                                                {project.tech.slice(0, 2).map((t, i) => (
                                                    <span key={i} className="px-3 py-1 bg-soft-blue border border-black/5 text-primary-navy/60 text-[10px] font-bold rounded-lg whitespace-nowrap">
                                                        {t}
                                                    </span>
                                                ))}
                                                {project.tech.length > 2 && <span className="text-[10px] font-bold text-primary-orange">+{project.tech.length - 2}</span>}
                                            </div>
                                        </div>
                                        <p className="text-mid-slate text-base leading-relaxed line-clamp-2">{project.description}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </Container>
            </Section>

            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

            {/* CTA */}
            <Section background="soft">
                <Container>
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto text-center py-10">
                            <h2 className="text-3xl lg:text-5xl font-heading font-extrabold text-primary-navy mb-8 tracking-tighter">Ready to Build Your Vision?</h2>
                            <p className="text-xl text-mid-slate mb-12 max-w-2xl mx-auto">Let's collaborate to create a digital product that stands out and achieves your business goals.</p>
                            <Button variant="primary" to="/contact" className="px-12 py-4 text-lg">Start a Project</Button>
                        </div>
                    </ScrollReveal>
                </Container>
            </Section>
        </div>
    );
};

export default PortfolioPage;
