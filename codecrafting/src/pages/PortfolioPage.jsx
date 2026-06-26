import React, { useEffect, useState } from 'react';
import PageHero from '../components/PageHero';
import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';
import Reveal from '../components/ScrollReveal';
import BackButton from '../components/BackButton';
import ProjectCard from '../components/ProjectCard';
import SkeletonCard from '../components/SkeletonCard';
import useProjects from '../hooks/useProjects';
import { PROJECT_SKELETON_COUNT } from '../utils/publicData';
import portfolioBg from '../assets/pictures/American corporations.jpg';
import { useSiteContent } from '../hooks/useSiteContent';
import SEO from '../components/SEO';

const INITIAL_PROJECTS_COUNT = 4;
const PROJECTS_INCREMENT = 4;

const PortfolioPage = () => {
    const { siteContent } = useSiteContent();
    const activePortfolioBg = siteContent.portfolio_bg || portfolioBg;
    const { projects, loading, error } = useProjects();
    const [visibleCount, setVisibleCount] = useState(INITIAL_PROJECTS_COUNT);
    const [expandedProjectId, setExpandedProjectId] = useState(null);
    const visibleProjects = projects.slice(0, visibleCount);
    const hasMoreProjects = visibleCount < projects.length;

    useEffect(() => {
        setVisibleCount(INITIAL_PROJECTS_COUNT);
    }, [projects.length]);

    const handleLoadMore = () => {
        setVisibleCount((currentCount) => currentCount + PROJECTS_INCREMENT);
    };

    const handleToggleProject = (id) => {
        setExpandedProjectId((currentId) => (currentId === id ? null : id));
    };

    return (
        <div className="page-enter">
            <SEO 
                title="Portfolio" 
                description="View our recent projects and case studies where we focus on digital authority, trust, and real business outcomes."
                url="/portfolio"
            />
            <PageHero
                badge="Showcase"
                title="Proven Craftsmanship"
                subtitle="A selection of high-performance digital products engineered for impact and scale."
                backgroundImage={activePortfolioBg}
            />

            <Container className="py-10">
                <BackButton />
            </Container>

            <Section background="white">
                <Container>
                    <div className="mb-14 flex flex-col gap-5 md:mb-16 lg:max-w-3xl">
                        <Reveal>
                            <p className="text-sm font-bold uppercase tracking-widest text-primary-orange">Selected Projects</p>
                            <h2 className="text-display-sm font-heading font-extrabold tracking-tighter text-primary-navy">
                                Work built for real outcomes.
                            </h2>
                            <p className="text-lg leading-relaxed text-mid-slate">
                                Explore our collection of premium digital experiences, where each project is a testament to our commitment to speed, clarity, and conversion.
                            </p>
                        </Reveal>
                    </div>

                    {error ? (
                        <p className="mb-8 rounded-3xl border border-red-200 bg-red-50 px-6 py-4 text-sm font-semibold text-red-600">
                            {error}
                        </p>
                    ) : null}

                    {loading ? (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-10">
                            {Array.from({ length: PROJECT_SKELETON_COUNT + 1 }, (_, index) => (
                                <Reveal key={`portfolio-skeleton-${index}`} delay={index * 0.1} variant="fade-up">
                                    <SkeletonCard />
                                </Reveal>
                            ))}
                        </div>
                    ) : null}

                    {!loading && visibleProjects.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-10">
                            {visibleProjects.map((project, index) => (
                                <Reveal key={project.id} delay={index * 0.1} variant="fade-up">
                                    <ProjectCard 
                                        project={project} 
                                        isPreview={false} 
                                        isExpanded={expandedProjectId === project.id}
                                        onToggle={() => handleToggleProject(project.id)}
                                    />
                                </Reveal>
                            ))}
                        </div>
                    ) : null}

                    {!loading && !error && visibleProjects.length > 0 && hasMoreProjects ? (
                        <Reveal delay={0.2} variant="fade-up">
                            <div className="mt-12 flex flex-col items-center gap-4 text-center">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-navy/45 sm:text-sm">
                                    Showing {visibleProjects.length} of {projects.length} projects
                                </p>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleLoadMore}
                                    className="min-w-[15rem] px-8 py-4"
                                >
                                    Load more projects
                                </Button>
                            </div>
                        </Reveal>
                    ) : null}

                    {!loading && !error && projects.length === 0 ? (
                        <div className="space-y-8">
                            <p className="text-lg font-semibold text-primary-navy">No projects yet</p>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-10">
                                {Array.from({ length: PROJECT_SKELETON_COUNT + 1 }, (_, index) => (
                                    <Reveal key={`portfolio-empty-${index}`} delay={index * 0.1} variant="fade-up">
                                        <SkeletonCard />
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </Container>
            </Section>

            <Section background="mesh" className="section-premium relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
                <Container>
                    <Reveal>
                        <div className="max-w-5xl mx-auto text-center p-20 md:p-32 glass-premium rounded-[80px] border-white/10 shadow-premium relative overflow-hidden">
                            <h2 className="text-display-md font-heading font-extrabold text-white mb-10 heading-premium tracking-tighter text-balance">Ready to Build <br /><span className="text-gradient">Your Digital Asset?</span></h2>
                            <p className="text-xl text-white/70 mb-14 max-w-2xl mx-auto leading-relaxed font-medium">Let's collaborate to engineer a website that doesn't just look good, but delivers measurable results for your mission.</p>
                            <Button variant="primary" to="/contact" className="px-16 py-7 text-2xl font-black shadow-3xl shadow-primary-orange/30 hover:scale-105 transition-all">Start a Project</Button>
                        </div>
                    </Reveal>
                </Container>
            </Section>
        </div>
    );
};

export default PortfolioPage;
