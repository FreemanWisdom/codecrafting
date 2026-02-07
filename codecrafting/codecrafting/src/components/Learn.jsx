import React from 'react';
import Section from './Section';
import Container from './Container';
import ScrollReveal from './ScrollReveal';
import learn1 from '../assets/pictures/Learnslideimg1.jpg';
import learn2 from '../assets/pictures/Learnslide2.jpg';
import learn3 from '../assets/pictures/Learnslideimg3.jpg';

const Learn = () => {
    const learningImages = [learn1, learn2, learn3];

    return (
        <Section id="learn" background="soft">
            <Container>
                <ScrollReveal>
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <div className="inline-block px-4 py-1 bg-primary-orange text-white text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                                Education
                            </div>
                            <h2 className="text-2xl lg:text-4xl font-heading font-extrabold text-primary-navy mb-10 tracking-tighter leading-tight">
                                Practical Web Development for the Modern Era
                            </h2>
                            <p className="text-lg text-mid-slate mb-8">
                                CodeCrafting isn't just about building sites; it's about sharing knowledge.
                                Our upcoming learning platform will focus on practical, project-based skills
                                that help you build real-world applications independently.
                            </p>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 w-5 h-5 text-primary-orange shrink-0">
                                        <svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary-navy">Project-Based Learning</h4>
                                        <p className="text-mid-slate">Learn by building actual products, not just watching videos.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 w-5 h-5 text-primary-orange shrink-0">
                                        <svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary-navy">Modern Tech Stack</h4>
                                        <p className="text-mid-slate">Master the tools used by industry leaders daily.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-white border border-primary-orange/20 rounded-xl">
                                <span className="text-sm font-bold text-primary-orange block mb-2">Coming Soon</span>
                                <p className="text-sm text-mid-slate">
                                    We're currently crafting our curriculum. Sign up for our newsletter to be the first to know when we launch.
                                </p>
                            </div>
                        </div>

                        <div className="lg:w-1/2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <img src={learn1} alt="Learning web development" className="rounded-xl shadow-lg w-full h-48 sm:h-64 object-cover" />
                                <img src={learn2} alt="Code editor" className="rounded-xl shadow-lg w-full h-48 sm:h-64 object-cover sm:mt-8" />
                                <div className="sm:col-span-2">
                                    <img src={learn3} alt="Web project" className="rounded-xl shadow-lg w-full h-52 sm:h-64 object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </Container>
        </Section>
    );
};

export default Learn;
