import React from 'react'
import { Link } from 'react-router-dom'
import { truncateText } from '../utils/publicData'
import { optimizeCloudinaryImage } from '../utils/image'

const ProjectCard = ({ project, isPreview = false, isExpanded = false, onToggle = null }) => {
  const shortDescription = isPreview
    ? truncateText(project.description, 110)
    : truncateText(project.description, 160)

  const descriptionClassName = isPreview
    ? 'mb-6 h-[4.5rem] text-sm leading-7 text-mid-slate line-clamp-3 flex items-center'
    : 'mb-4 text-sm leading-7 text-mid-slate'

  const optimizedImage = optimizeCloudinaryImage(project.image, 800)
  const techItems = Array.isArray(project.techStack)
    ? project.techStack
    : String(project.tech_stack || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)

  const hasLiveDemo = Boolean(project.projectUrl)

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[32px] border border-black/5 bg-white p-5 shadow-[0_24px_60px_rgba(17,57,89,0.08)] transition-all duration-500 md:p-6 ${
        isExpanded
          ? 'relative z-20 scale-[1.02] ring-2 ring-primary-orange shadow-2xl'
          : 'hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_30px_80px_rgba(17,57,89,0.12)]'
      }`}
    >
      <div className="relative mb-6 aspect-video overflow-hidden rounded-[24px] border border-black/5 bg-soft-gray shadow-xl">
        {project.image ? (
          <img
            src={optimizedImage}
            alt={`${project.title} project screenshot`}
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary-navy to-primary-orange/70 p-6 text-center text-sm font-black uppercase tracking-[0.2em] text-white/80">
            {project.title} Preview
          </div>
        )}
      </div>

      {techItems.length > 0 ? (
        <ul className="mb-4 flex flex-wrap gap-2" aria-label="Project technology stack">
          {techItems.map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-primary-navy/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-navy italic"
            >
              {tech}
            </li>
          ))}
        </ul>
      ) : null}

      <h3 className="heading-premium mb-3 text-2xl font-heading font-extrabold tracking-tighter text-primary-navy">{project.title}</h3>

      <p className={descriptionClassName}>{isExpanded ? project.description : shortDescription}</p>

      {isExpanded && !isPreview ? (
        <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="rounded-[24px] border border-blue-50 bg-soft-blue/30 p-6">
            <h4 className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-primary-orange">Problem</h4>
            <p className="text-sm leading-relaxed text-mid-slate italic">
              {project.problem || 'Solving complex engineering challenges to deliver high-performance results.'}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[24px] bg-slate-50 p-6">
              <h4 className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-primary-navy">Solution</h4>
              <p className="text-xs leading-relaxed text-mid-slate">
                {project.solution || 'Architecting customized digital systems focused on speed and scalability.'}
              </p>
            </div>
            <div className="rounded-[24px] bg-slate-50 p-6">
              <h4 className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-primary-orange">Result</h4>
              <p className="text-xs leading-relaxed text-mid-slate">
                {project.result || 'Increased brand authority and improved user engagement metrics.'}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-4">
        {isPreview ? (
          <>
            <Link
              to="/portfolio"
              className="inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-2xl bg-primary-orange px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white shadow-xl shadow-primary-orange/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-orange/35"
            >
              View Case Study
            </Link>
            {hasLiveDemo ? (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-2xl bg-primary-navy px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-1"
              >
                View Project
              </a>
            ) : null}
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onToggle}
              className={`inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-[0.18em] transition-all duration-300 ${
                isExpanded
                  ? 'bg-mid-slate/10 text-primary-navy hover:bg-mid-slate/20'
                  : 'bg-primary-orange text-white shadow-xl shadow-primary-orange/20 hover:-translate-y-1 hover:shadow-2xl'
              }`}
            >
              {isExpanded ? 'Show Less' : 'View Full Case Study'}
            </button>

            {hasLiveDemo ? (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl bg-primary-navy px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                View Project
              </a>
            ) : null}
          </>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
