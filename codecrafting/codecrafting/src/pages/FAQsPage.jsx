import React, { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon } from '@hugeicons/core-free-icons';
import PageHero from '../components/PageHero';
import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';
import ScrollReveal from '../components/ScrollReveal';
import BackButton from '../components/BackButton';
import faqsBg from '../assets/pictures/Corporate Globe Wallpaper for Decor.jpg';

const faqData = [
    {
        question: "What types of websites do you build?",
        answer: "We specialize in high-performance corporate websites, e-commerce architectures, and custom SaaS interfaces. Every project is built with dual focus: Engineering precision and Authority branding."
    },
    {
        question: "How long is a typical project timeline?",
        answer: "Standard corporate builds typically range from 2–4 weeks. Complex e-commerce or custom applications may take 6 weeks or more. We prioritize quality over speed, but we execute with precision."
    },
    {
        question: "What is your pricing structure?",
        answer: "We operate on a project-based pricing model tailored to your specific requirements. We don't do 'cheap' templates; we build custom assets that provide long-term business value. Contact us for a detailed proposal."
    },
    {
        question: "Do you offer post-launch support?",
        answer: "Yes. All projects include 30 days of complimentary technical support. We also offer extended maintenance plans for ongoing optimization, security, and updates."
    },
    {
        question: "Is your learning platform for beginners?",
        answer: "CodeCrafting Education is designed for anyone serious about mastering frontend development. Whether you're starting out or looking to upgrade to enterprise-level practices, our project-based approach will move the needle."
    },
    {
        question: "Will I get a certificate from your courses?",
        answer: "No. We focus on results, not paper. Our goal is to help you build a high-performance portfolio that speaks louder than any certificate ever could."
    }
];

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
    return (
        <div className={`rounded-3xl transition-all duration-500 overflow-hidden ${isOpen ? 'bg-primary-navy shadow-2xl' : 'bg-soft-blue border border-black/5'}`}>
            <button
                className="w-full px-8 py-6 flex items-center justify-between text-left cursor-pointer transition-colors duration-300"
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                <span className={`text-lg font-heading font-extrabold tracking-tight pr-8 transition-colors ${isOpen ? 'text-white' : 'text-primary-navy'}`}>{question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-primary-orange text-white rotate-180' : 'bg-primary-navy/5 text-primary-navy'}`}>
                    <HugeiconsIcon icon={ArrowDown01Icon} size={20} />
                </div>
            </button>
            <div
                className="transition-all duration-500 ease-in-out overflow-hidden"
                style={{
                    maxHeight: isOpen ? '300px' : '0',
                    opacity: isOpen ? 1 : 0
                }}
            >
                <div className="px-8 pb-8 pt-0">
                    <p className={`text-base leading-relaxed ${isOpen ? 'text-white/60' : 'text-mid-slate'}`}>{answer}</p>
                </div>
            </div>
        </div>
    );
};

const FAQsPage = () => {
    const [openIndex, setOpenIndex] = useState(0);

    useEffect(() => {
        document.title = 'FAQs — CodeCrafting';
    }, []);

    return (
        <div className="page-enter">
            <PageHero
                badge="Knowledge Hub"
                title="Frequently Asked Questions"
                subtitle="Transparent answers to common inquiries about our studio services and learning platform."
                backgroundImage={faqsBg}
            />

            <Container className="py-8">
                <BackButton />
            </Container>

            <Section background="white">
                <Container>
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto space-y-4">
                            {faqData.map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openIndex === index}
                                    onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                                />
                            ))}
                        </div>
                    </ScrollReveal>
                </Container>
            </Section>

            {/* CTA */}
            <Section background="soft">
                <Container>
                    <ScrollReveal>
                        <div className="text-center max-w-2xl mx-auto py-10">
                            <h2 className="text-3xl lg:text-5xl font-heading font-extrabold text-primary-navy mb-8 tracking-tighter">
                                Still Curious?
                            </h2>
                            <p className="text-xl text-mid-slate mb-12">
                                If you have a specific question not covered here, feel free to reach out directly through our support or contact channels.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-5 justify-center">
                                <Button variant="primary" to="/contact" className="px-10 py-4">Contact Studio</Button>
                                <Button variant="outline" to="/support" className="px-10 py-4">Technical Support</Button>
                            </div>
                        </div>
                    </ScrollReveal>
                </Container>
            </Section>
        </div>
    );
};

export default FAQsPage;
