import React from 'react';
import Section from './Section';
import Container from './Container';
import ScrollReveal from './ScrollReveal';
import ProjectCard from './ProjectCard';
import SkeletonCard from './SkeletonCard';
import useProjects from '../hooks/useProjects';
import { PROJECT_SKELETON_COUNT } from '../utils/publicData';

const Portfolio = () => {
    const { projects, loading, error } = useProjects();

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
                    {loading
                        ? Array.from({ length: PROJECT_SKELETON_COUNT + 1 }, (_, index) => (
                              <ScrollReveal key={`portfolio-component-loading-${index}`} delay={index * 0.1}>
                                  <SkeletonCard />
                              </ScrollReveal>
                          ))
                        : null}

                    {!loading && projects.slice(0, 4).map((project, index) => (
                        <ScrollReveal key={project.id} delay={index * 0.1}>
                            <ProjectCard project={project} />
                        </ScrollReveal>
                    ))}
                </div>

                {error ? (
                    <p className="mt-8 rounded-3xl border border-red-200 bg-red-50 px-6 py-4 text-sm font-semibold text-red-600">
                        {error}
                    </p>
                ) : null}

                {!loading && !error && projects.length === 0 ? (
                    <div className="mt-8 space-y-6">
                        <p className="text-lg font-semibold text-primary-navy">No projects yet</p>
                        <div className="grid md:grid-cols-2 gap-10">
                            {Array.from({ length: PROJECT_SKELETON_COUNT + 1 }, (_, index) => (
                                <ScrollReveal key={`portfolio-component-empty-${index}`} delay={index * 0.1}>
                                    <SkeletonCard />
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                ) : null}
            </Container>
        </Section>
    );
};

export default Portfolio;
