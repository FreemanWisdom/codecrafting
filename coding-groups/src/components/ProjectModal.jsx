import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon } from '@hugeicons/core-free-icons';
import Button from './Button';
import { optimizeCloudinaryImage } from '../utils/image';

const ProjectModal = ({ project, onClose }) => {
    if (!project) {
        return null;
    }

    const hasExternalLink = Boolean(project.link);

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 lg:p-12 fade-in">
            <div className="absolute inset-0 bg-authority-navy/95 backdrop-blur-xl" onClick={onClose}></div>

            <div className="relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[40px] border-premium bg-white shadow-2xl slide-up md:rounded-[50px]">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 rounded-full bg-primary-navy/5 p-3 text-primary-navy shadow-lg transition-all duration-300 hover:bg-primary-orange hover:text-white group md:top-8 md:right-8 md:p-4"
                    aria-label="Close project details"
                >
                    <HugeiconsIcon icon={Cancel01Icon} size={24} strokeWidth={3} className="transition-transform group-hover:rotate-90" />
                </button>

                <div className="flex h-full max-h-[90vh] flex-col overflow-y-auto lg:flex-row">
                    <div className="relative flex items-center justify-center overflow-hidden border-b border-black/5 bg-soft-gray p-8 lg:w-3/5 lg:border-r lg:border-b-0 lg:p-16">
                        <div className="absolute inset-0 bg-primary-orange/5 opacity-30"></div>
                        <img
                            src={optimizeCloudinaryImage(project.image, 1200)}
                            alt={`${project.title} project preview`}
                            className="relative z-10 mt-12 max-h-[40vh] w-full rounded-2xl object-cover shadow-2xl transition-transform duration-700 hover:scale-[1.02] md:rounded-3xl md:max-h-[60vh] lg:mt-0"
                            loading="lazy"
                        />
                    </div>

                    <div className="flex flex-col justify-center p-8 md:p-12 lg:w-2/5 lg:p-16">
                        <span className="mb-4 inline-block self-start rounded-full bg-primary-orange/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-primary-orange md:mb-6">
                            {project.category}
                        </span>
                        <h3 className="mb-5 text-2xl font-heading font-extrabold text-primary-navy heading-premium md:mb-7 md:text-5xl">
                            {project.title}
                        </h3>
                        <p className="mb-8 text-base leading-relaxed text-mid-slate md:text-lg">
                            {project.summary}
                        </p>

                        <div className="mb-10 space-y-8">
                            <div>
                                <h4 className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary-navy/40">The Challenge</h4>
                                <p className="text-base font-medium leading-relaxed text-mid-slate md:text-lg">{project.problem}</p>
                            </div>

                            <div className="h-1 w-12 bg-primary-orange/20"></div>

                            <div>
                                <h4 className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary-orange">The Solution</h4>
                                <p className="text-base font-bold leading-relaxed text-primary-navy md:text-lg">{project.solution}</p>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h4 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-primary-navy/40">Engineering Stack</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((technology) => (
                                    <span
                                        key={technology}
                                        className="rounded-xl border border-black/5 bg-primary-navy/5 px-4 py-2 text-xs font-black uppercase tracking-tight text-primary-navy"
                                    >
                                        {technology}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            {hasExternalLink ? (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex min-h-[3.5rem] items-center justify-center rounded-2xl border border-primary-orange/20 bg-primary-orange/10 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-primary-orange transition-all duration-300 hover:bg-primary-orange hover:text-white"
                                >
                                    Visit Project
                                </a>
                            ) : null}

                            <Button variant="primary" onClick={onClose} className="w-full py-5 text-lg font-black shadow-xl shadow-primary-orange/20">
                                Return to Showcase
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
