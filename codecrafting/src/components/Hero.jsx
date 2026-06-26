import heroBg from '../assets/pictures/bacground 2.jpg';
import dashboardMockup from '../assets/pictures/hero_dashboard_mockup_1776634762723.png'; // Using the newly generated asset
import Button from './Button';
import Container from './Container';
import Reveal from './ScrollReveal';
import { useSiteContent } from '../hooks/useSiteContent';
import { optimizeCloudinaryImage } from '../utils/image';

const Hero = () => {
    const { siteContent } = useSiteContent();
    const activeHeroBg = siteContent.home_hero_bg || heroBg;
    const optimizedHeroVisual = optimizeCloudinaryImage(activeHeroBg, 1920);

    const legacyHeadline = (siteContent.hero_headline || '').trim();
    const legacyHeadlineParts = legacyHeadline
        ? legacyHeadline.split(/\s*\|\s*|\n+/).map((part) => part.trim()).filter(Boolean)
        : [];
    const legacyPrimary = legacyHeadlineParts[0] || '';
    const legacySecondary = legacyHeadlineParts.slice(1).join(' ');
    const hasLegacyHeadline = Boolean(legacyHeadlineParts.length);
    const activeHeadlinePrimary =
        siteContent.hero_headline_primary ||
        legacyPrimary ||
        'Launch a High-Converting Online Store';
    const activeHeadlineSecondary =
        siteContent.hero_headline_secondary ||
        legacySecondary ||
        (hasLegacyHeadline ? '' : 'Build an Online Presence That Brings You More Customers');
    const activeSubheadline =
        siteContent.hero_subheadline ||
        'We design fast, modern websites that turn visitors into paying customers.';

    return (
        <section className="hero-section overflow-hidden">
            <div 
                className="hero-background" 
                aria-hidden="true"
                style={{ 
                    backgroundImage: `linear-gradient(rgba(10, 37, 64, 0.4), rgba(6, 18, 30, 0.5)), url('${optimizedHeroVisual}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            <Container className="hero-content">
                <div className="hero-grid">
                    <div className="hero-text-col">
                        <div className="hero-stack">
                            <Reveal variant="fade-up" delay={0.1}>
                                <h1 className="hero-title">
                                    {activeHeadlineSecondary ? (
                                        <span className="hero-title-secondary">{activeHeadlineSecondary}</span>
                                    ) : null}
                                    <span className="hero-title-primary">{activeHeadlinePrimary}</span>
                                </h1>
                            </Reveal>

                            <Reveal variant="fade-up" delay={0.2}>
                                <p className="hero-description">{activeSubheadline}</p>
                            </Reveal>

                            <Reveal variant="fade-up" delay={0.3}>
                                <div className="hero-actions">
                                    <Button
                                        variant="primary"
                                        to="/contact"
                                        className="hero-button hero-button-primary"
                                    >
                                        Get a Website
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        to="/portfolio"
                                        className="hero-button hero-button-secondary"
                                    >
                                        View Our Work
                                    </Button>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Hero;
