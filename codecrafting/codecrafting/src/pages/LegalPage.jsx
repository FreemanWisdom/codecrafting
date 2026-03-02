import React, { useEffect } from 'react';
import PageHero from '../components/PageHero';
import Container from '../components/Container';
import Section from '../components/Section';
import ScrollReveal from '../components/ScrollReveal';
import BackButton from '../components/BackButton';
import legalBg from '../assets/pictures/Millions , Backgrounds and Vectors  _ Pngtree.jpg';

const LegalPage = () => {
    useEffect(() => {
        document.title = 'Legal — CodeCrafting';
    }, []);

    const sections = [
        {
            title: "Privacy Policy",
            content: [
                "Your privacy is critically important to us. At CodeCrafting, we have a few fundamental principles: We don't ask you for personal information unless we truly need it. We don't share your personal information with anyone except to comply with the law, develop our products, or protect our rights.",
                "In our education waitlist and contact forms, we collect basic contact information (Name, Email, Phone) solely for the purpose of communicating with you regarding our services and learning platform updates. We do not sell or lease your data to third parties.",
                "Our website may use cookies to improve user experience and analyze traffic patterns. You can choose to disable cookies in your browser settings at any time."
            ]
        },
        {
            title: "Terms of Service",
            content: [
                "By using the CodeCrafting website and services, you agree to comply with and be bound by the following terms. All content provided on this site is for informational purposes related to our studio services and educational offerings.",
                "Project deliverables, timelines, and payment terms for professional services are governed by separate signed agreements per project.",
                "Access to the CodeCrafting learning platform (upon launch) will be subject to specific usage terms that will be provided at the time of registration."
            ]
        },
        {
            title: "Disclaimer",
            content: [
                "CodeCrafting Education is a skill-development platform focused on practical frontend engineering. We are not an accredited academic institution and do not provide formal certifications or recognized degrees.",
                "The 'waitlist' for our learning platform does not guarantee enrollment or specific pricing. Official launch dates and enrollment details will be announced to waitlist members first."
            ]
        }
    ];

    return (
        <div className="page-enter">
            <PageHero
                badge="Governance"
                title="Legal & Compliance"
                subtitle="Transparent guidelines on how we handle your data and the terms of our professional ecosystem."
                backgroundImage={legalBg}
            />

            <Container className="py-8">
                <BackButton />
            </Container>

            <Section background="white">
                <Container>
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto">
                            <div className="space-y-16">
                                {sections.map((section, index) => (
                                    <div key={index} className="border-b border-black/5 pb-16 last:border-0 last:pb-0">
                                        <h2 className="text-3xl font-heading font-extrabold text-primary-navy mb-8 tracking-tighter">{section.title}</h2>
                                        <div className="space-y-6 text-mid-slate text-lg leading-relaxed">
                                            {section.content.map((p, pIndex) => (
                                                <p key={pIndex}>{p}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </Container>
            </Section>

            {/* Footer Note */}
            <Section background="soft">
                <Container>
                    <ScrollReveal>
                        <div className="text-center py-10">
                            <p className="text-mid-slate text-sm max-w-2xl mx-auto mb-4">
                                These terms were last updated on February 12, 2026. CodeCrafting reserves the right to modify these terms as needed to remain compliant with evolving digital standards.
                            </p>
                            <p className="text-primary-navy font-bold text-sm">
                                Questions? Email us at ccraftingcc@gmail.com
                            </p>
                        </div>
                    </ScrollReveal>
                </Container>
            </Section>
        </div>
    );
};

export default LegalPage;
