import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  WhatsappIcon,
  Mail01Icon,
  BrowserIcon,
  MagicWand01Icon,
  Target01Icon,
} from '@hugeicons/core-free-icons'

import Container from '../components/Container'
import Section from '../components/Section'
import Button from '../components/Button'
import Hero from '../components/Hero'
import ReviewsSection from '../components/ReviewsSection'
import ScrollRevealComponent from '../components/ScrollReveal'
import ProjectCard from '../components/ProjectCard'
import SkeletonCard from '../components/SkeletonCard'
import SEO from '../components/SEO'

import { useSiteContent } from '../hooks/useSiteContent'
import useProjects from '../hooks/useProjects'
import { PROJECT_SKELETON_COUNT as SKELETON_COUNT } from '../utils/publicData'
import { optimizeCloudinaryImage } from '../utils/image'

import aboutImg from '../assets/pictures/Web Design.jpg'

const HomePage = () => {
  const { siteContent } = useSiteContent()
  const { projects, loading: projectsLoading, error: projectsError } = useProjects()

  const activeAboutImg = siteContent.home_secondary_image || aboutImg
  const activeAboutHeadline = siteContent.about_headline || 'We Focus on Your Business Growth, Not Just Your Code'
  const activeAboutDescription =
    siteContent.about_description ||
    'CodingGroups is a web studio helping businesses build and revamp their online presence with purpose. We don\'t just create websites, we design digital experiences that solve real problems, build trust, and drive measurable results.'

  const featuredProjects = projects.slice(0, 3)

  return (
    <div className="page-enter">
      <SEO
        title="Home"
        description="We build fast, modern websites and online stores that drive measurable growth for businesses."
        url="/"
      />
      <Hero />

      <Section background="white" className="py-20 md:py-24">
        <Container className="max-w-[1200px]">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
            <div className="lg:w-1/2">
              <ScrollRevealComponent>
                <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary-orange">About CodingGroups</p>
                <h2 className="mb-8 text-4xl font-heading font-black leading-[1.1] tracking-tight text-primary-navy md:text-5xl">
                  {activeAboutHeadline}
                </h2>
                <div className="max-w-xl space-y-6 text-lg leading-relaxed text-mid-slate">
                  {activeAboutDescription.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </ScrollRevealComponent>
            </div>
            <div className="mt-12 w-full lg:mt-0 lg:w-1/2">
              <ScrollRevealComponent delay={0.2}>
                <div className="group relative">
                  <div className="absolute -inset-4 scale-95 rounded-[32px] bg-primary-orange/5 transition-transform duration-700 group-hover:scale-100" />
                  <img
                    src={optimizeCloudinaryImage(activeAboutImg, 800)}
                    alt="CodingGroups team collaborating on web design and development"
                    loading="lazy"
                    className="relative z-10 h-[400px] w-full rounded-2xl object-cover shadow-2xl transition-all duration-700 group-hover:scale-[1.02] md:h-[500px]"
                  />
                </div>
              </ScrollRevealComponent>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="soft" className="section-premium">
        <Container>
          <ScrollRevealComponent>
            <div className="mx-auto mb-20 max-w-3xl text-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary-orange italic">Our Focus Areas</p>
              <h2 className="mb-6 text-display-sm font-heading font-extrabold tracking-tighter text-primary-navy">
                Targeted Solutions <br />For Your Business
              </h2>
              <p className="text-xl text-mid-slate">
                We specialize in three core areas, ensuring each project gets the specific attention it deserves.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {[
                {
                  title: 'E-Commerce Platforms & Information Websites',
                  desc: 'High-performance landing pages and corporate online stores.',
                  icon: <HugeiconsIcon icon={BrowserIcon} size={32} />,
                },
                {
                  title: 'Brand Identity & Digital Presence',
                  desc: 'Digital systems for community and scalable growth.',
                  icon: <HugeiconsIcon icon={Target01Icon} size={32} />,
                },
                {
                  title: 'Web Designs & Admin Dashboards',
                  desc: 'Elegant digital hubs for your creative authority.',
                  icon: <HugeiconsIcon icon={MagicWand01Icon} size={32} />,
                },
              ].map((service, index) => (
                <ScrollRevealComponent key={service.title} delay={index * 0.1} variant="fade-up">
                  <article className="review-card h-full rounded-[40px] border border-black/5 bg-white p-12 transition-all duration-500 group hover:border-primary-orange/20 hover:shadow-premium">
                    <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-authority-navy/5 text-primary-orange transition-transform duration-500 group-hover:scale-110">
                      {service.icon}
                    </div>
                    <h3 className="mb-4 text-2xl font-heading font-bold text-primary-navy">{service.title}</h3>
                    <p className="leading-relaxed text-mid-slate">{service.desc}</p>
                  </article>
                </ScrollRevealComponent>
              ))}
            </div>
          </ScrollRevealComponent>
        </Container>
      </Section>

      <Section background="white" className="section-premium">
        <Container>
          <div className="mb-16 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
            <ScrollRevealComponent>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary-orange">Case Studies</p>
              <h2 className="text-display-sm font-heading font-extrabold tracking-tighter leading-tight text-primary-navy">
                Built for Authority, <br />Designed for Trust.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mid-slate">
                A curated selection of recent work that shows how strategy, speed, and clarity come together in production.
              </p>
            </ScrollRevealComponent>
            <ScrollRevealComponent delay={0.2}>
              <Button variant="outline" to="/portfolio">
                Start a Project
              </Button>
            </ScrollRevealComponent>
          </div>

          {projectsError ? (
            <p className="mb-8 rounded-3xl border border-red-200 bg-red-50 px-6 py-4 text-sm font-semibold text-red-600">{projectsError}</p>
          ) : null}

          {projectsLoading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {Array.from({ length: SKELETON_COUNT }, (_, index) => (
                <ScrollRevealComponent key={`home-project-skeleton-${index}`} delay={index * 0.1} variant="scale-up">
                  <SkeletonCard />
                </ScrollRevealComponent>
              ))}
            </div>
          ) : null}

          {!projectsLoading && featuredProjects.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {featuredProjects.map((project, index) => (
                <ScrollRevealComponent key={project.id} delay={index * 0.15} variant="scale-up">
                  <ProjectCard project={project} isPreview={true} />
                </ScrollRevealComponent>
              ))}
            </div>
          ) : null}

          {!projectsLoading && !projectsError && featuredProjects.length === 0 ? (
            <div className="space-y-8">
              <p className="text-lg font-semibold text-primary-navy">No projects yet</p>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                {Array.from({ length: SKELETON_COUNT }, (_, index) => (
                  <ScrollRevealComponent key={`home-project-empty-${index}`} delay={index * 0.1} variant="scale-up">
                    <SkeletonCard />
                  </ScrollRevealComponent>
                ))}
              </div>
            </div>
          ) : null}
        </Container>
      </Section>

      <ReviewsSection />

      <Section background="white" className="section-premium">
        <Container className="px-6 text-center">
          <ScrollRevealComponent>
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[40px] border-premium bg-primary-navy p-10 text-white shadow-3xl md:rounded-[60px] md:p-20 sm:p-14">
              <div className="absolute top-0 right-0 -mt-48 -mr-48 h-96 w-96 rounded-full bg-primary-orange/10 blur-[100px]" />
              <div className="relative z-10">
                <h2 className="heading-premium mb-8 text-display-md font-heading font-extrabold">
                  Ready to Build <br /> <span className="text-gradient">Digital Authority?</span>
                </h2>
                <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-2xl md:mb-14">
                  CodingGroups is currently accepting new projects. Let&apos;s discuss how we can elevate your presence today.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
                  <a
                    name="whatsapp-cta"
                    href="https://wa.me/2349071537759"
                    className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-10 py-5 text-lg font-black text-white shadow-xl transition-all hover:scale-105"
                  >
                    <HugeiconsIcon icon={WhatsappIcon} size={28} /> Contact Us
                  </a>
                  <a
                    name="email-cta"
                    href="mailto:ccraftingcc@gmail.com"
                    className="flex items-center justify-center gap-3 rounded-2xl bg-white px-10 py-5 text-lg font-black text-primary-navy shadow-xl transition-all hover:scale-105"
                  >
                    <HugeiconsIcon icon={Mail01Icon} size={28} /> Get a Website
                  </a>
                </div>
              </div>
            </div>
          </ScrollRevealComponent>
        </Container>
      </Section>
    </div>
  )
}

export default HomePage
