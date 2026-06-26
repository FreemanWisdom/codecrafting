import React from 'react';
import Section from './Section';
import Container from './Container';
import ScrollReveal from './ScrollReveal';

const techStack = [
    {
        name: 'HTML5',
        color: '#E34F26',
        svg: (
            <svg viewBox="0 0 384 512" fill="currentColor" className="w-12 h-12">
                <path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z" />
            </svg>
        ),
    },
    {
        name: 'CSS3',
        color: '#1572B6',
        svg: (
            <svg viewBox="0 0 384 512" fill="currentColor" className="w-12 h-12">
                <path d="M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z" />
            </svg>
        ),
    },
    {
        name: 'JavaScript',
        color: '#F7DF1E',
        svg: (
            <svg viewBox="0 0 448 512" fill="currentColor" className="w-12 h-12">
                <path d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-19.5 0-13.4-17.1-15.7-35.8-21.6-25.6-8.2-54.8-15.7-54.8-46.7 0-25.5 18.6-45.6 58.2-45.6 31.8 0 51.6 13.8 61.2 33l-31.2 20.4c-6.6-12-14.1-16.8-28.8-16.8-14.4 0-24 7.5-24 16.5 0 11.7 15.6 14.1 36.3 20.7 27.3 8.7 54.3 17.7 54.3 47.4 0 28.8-22.1 48.9-63.1 48.9z" />
            </svg>
        ),
    },
    {
        name: 'React',
        color: '#61DAFB',
        svg: (
            <svg viewBox="0 0 512 512" fill="currentColor" className="w-12 h-12">
                <path d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 62.3-22.2 120.5 1 4.7 2.1 9.4 3.3 14-5.9 1.9-11.8 3.8-17.6 5.9-54.9 20.2-95 54.2-92.4 78 2.3 22.4 46.5 45.4 114.7 59.8 4 3 8 5.9 12.1 8.8.4 2.1.8 4.2 1.3 6.3 15.5 68.2 46.7 110.1 76.5 112 1.7.1 3.4.2 5.2.2 26 0 54.7-21.7 78.4-56.5 4.9-7.2 9.4-14.8 13.6-22.7 4.2 2.5 8.3 5.1 12.4 7.6 52.8 32.7 99.7 43.1 120.7 22.6 19.3-18.8 15.5-66.6-4.9-119-4-10.3-8.6-20.7-13.6-31.2 55.7-18.7 92.6-50.6 88.5-73.3-3.6-19.8-38.9-39.8-102.3-53.8zm-26.7 23.9c-8.9.9-18.2 2.3-27.8 4.1 4.1 11.8 7.3 24 9.5 36.6 28 6.4 51.5 15.8 68.1 27.5-5.4 10.2-25.1 22.2-54.4 32.7-3.6 1.3-7.4 2.5-11.3 3.6 2.3-11.5 3.3-23.4 3-35.4-1-41.6-15.1-78.6-33.8-104l3-2.9c16.6-16 31.9-28.5 45.3-37 17.6-11.1 28.5-12.8 31-10.7 2.1 1.8 2.6 11.6-4.5 28.2-8.5 20.1-20.3 40.5-34.1 59.9-2.3 3.1-4.7 6.1-7.1 9.1-3.6 1.8-7.3 3.5-11.1 5.3zm-162.7-52.5c23.5-23.7 46.9-40.4 67.2-48 18.2-6.8 29-4.8 31.3-1.4 3 4.5-5 20.7-22.9 44-12 15.5-26.7 32-42.5 48.7-2.6-6-5.4-11.9-8.4-17.7-8-15.6-17.7-30.6-28.5-44.5 1.3-1.6 2.6-3.2 3.8-4.8zm-119.8-17c-2-3-1.2-12.8 12.9-25 18-15.5 41.5-27.4 67.6-34 9.4-2.4 19-4.3 28.7-5.8 3.3 12.3 5.4 25.4 6.1 39-1.3 1-2.6 2.1-4 3.1-23.9 19.3-46.3 42.1-64.8 65.5-3.3-4.7-6.5-9.5-9.5-14.4-12.8-21.2-22.2-44-27.1-66.3-1.3-6.2-2.5-12.4-3.5-18.5-.7-8.3-.7-14 3.1-21.6zm26.9 168.1c-16.7-6.5-37.1-16.5-51.1-30.3-3.6-3.6-3.4-6.4-1.3-8.8 6.4-7.5 26.1-15 54.9-21.7 4.1-1 8.3-1.9 12.6-2.7 1.8 9.5 4.5 18.9 8.2 28.1 4.7 11.8 10.6 23.3 17.5 34.3-11.3 3.3-22.2 6.5-32.9 8.9-2 1-4.1 1.8-6.1 2.3-1.6-.3-3.1-.7-4.6-.9-2.3 0-5 .3-7.2.8z" />
                <path d="M256 182.2c16 0 31.5 2.1 46.1 6v-1.1c11.3-9.1 21.6-18.8 30.9-28.9.5-.6 1.1-1.1 1.6-1.7-19-15.4-44-25.9-78.6-25.9-46.7 0-82 17.3-100.2 41.1C167.3 189 181 206 195 221.7c8.5-15.9 21.4-30 38.3-39.5zm-55.8 39.5c.3-1.9.6-3.9 1-5.8-20.7-19-39.7-40.4-56-62.8-3.4-4.8 .2-10 6-10h103c3.5 0 6.5 2.5 7.2 5.9l4.5 24.3c-23 7.8-43.6 20.2-61.1 36.3.3-1.9 .6-3.9 1-5.9z" />
                <path d="M211.7 334v1.1c-16-4-31.5-10.2-46.1-18.6 3.1 5.9 6.6 11.6 10.3 17.1-1.5-1.5-3.1-3.2-4.7-4.9.4.5 .9 1.1 1.3 1.6 18.5 14.8 44.5 25 79.2 25 51 0 88.5-19.6 106.8-46.7.3-1.9 .6-3.9 1-5.9-9.1 17.5-24.1 32.8-43.4 42.6-1.7-5.3-3-10.7-3.9-16.2 3.8 2.6 7.8 5.1 11.9 7.4-25.9-3.2-49-14-68-30.8-.2-1-.3-2.1-.5-3.1 3.5 10 7.8 19.8 12.7 29.2-18-9-33.5-22-45.5-37.3l-11.2-40.5c-3.5 0-6.5 2.5-7.2 5.9l-4.5 24.3c21.8 12.9 46.5 22 72.8 26.6-4.6 4.9-8.8 10-12.7 15.3-.2-.5-.5-1-.7-1.5z" />
                <path d="M165.7 319.4c12-15.4 27.5-28.5 45.5-37.3l11.2 40.5c3.5 0 6.5-2.5 7.2-5.9l4.5-24.3c-21.8-12.9-46.5-22-72.8-26.6 4.6-4.9 8.8-10 12.7-15.3.3 .5 .5 1 .7 1.5-3.1-5.9-6.6-11.6-10.3-17.1 1.5 1.5 3.1 3.2 4.7 4.9-.4-.5-.9-1.1-1.3-1.6-18.5-14.8-44.5-25-79.2-25-51 0-88.5 19.6-106.8 46.7-.3 1.9-.6 3.9-1 5.9 9.1-17.5 24.1-32.8 43.4-42.6 1.7 5.3 3 10.7 3.9 16.2-3.8-2.6-7.8-5.1-11.9-7.4 25.9 3.2 49 14 68 30.8.2 1 .3 2.1 .5 3.1-3.5-10-7.8-19.8-12.7-29.2z" />
                <path d="M371.9 295.6c.3 1.9 .6 3.9 1 5.8 20.7 19 39.7 40.4 56 62.8 3.4 4.8-.2 10-6 10h-103c-3.5 0-6.5-2.5-7.2-5.9l-4.5-24.3c23-7.8 43.6-20.2 61.1-36.3-.3 1.9-.6 3.9-1 5.9-16 0-31.5-2.1-46.1-6v1.1c-11.3 9.1-21.6 18.8-30.9 28.9-.5 .6-1.1 1.1-1.6 1.7 19 15.4 44 25.9 78.6 25.9 46.7 0 82-17.3 100.2-41.1-11.5-17.3-25.2-34.3-39.2-50-8.5 15.9-21.4 30-38.3 39.5z" />
            </svg>
        ),
    },
    {
        name: 'Next.js',
        color: '#000000',
        svg: (
            <svg viewBox="0 0 512 512" fill="currentColor" className="w-12 h-12">
                <path d="M256 512C114.6 512 0 397.4 0 256S114.6 0 256 0s256 114.6 256 256-114.6 256-256 256zM151.4 179.9v152.2h31.8V230l110.6 153.2c6.1-2.9 12-6.1 17.6-9.6L183.2 179.9h-31.8zm209.2 0h-31.8v107.4l31.8 44.1V179.9z" />
            </svg>
        ),
    },
    {
        name: 'TypeScript',
        color: '#3178C6',
        svg: (
            <svg viewBox="0 0 512 512" fill="currentColor" className="w-12 h-12">
                <path d="M480 48H32a16 16 0 00-16 16v400a16 16 0 0016 16h448a16 16 0 0016-16V64a16 16 0 00-16-16zm-74.8 387.6c-42.6 0-66.2-24.3-66.2-53.1 0-25.7 17.6-43 43-43 14.8 0 26.6 6 34.6 15l-16.7 15.3c-4.2-4.5-12.2-9-19-9-12.7 0-20.9 9.3-20.9 21.6 0 13.9 9.2 21.6 21 21.6 8 0 16-4.5 21.1-10v35.3c-6.2 3.6-17.1 6.3-28.7 6.3zm81.4-8.8l-15.6 15.4c-9.5-9.3-17.6-21.7-22-35.3H409l-19.5 59.9h-21.4l57.7-160h22.4l58.1 160h-21.4l-19.3-59.9h-33l39.6-32.9 8.2-6.8zM245.9 202v233.6h-34V202H135.5v-31.6h186.8v31.6H245.9z" />
            </svg>
        ),
    },
    {
        name: 'Node.js',
        color: '#5FA04E',
        svg: (
            <svg viewBox="0 0 448 512" fill="currentColor" className="w-12 h-12">
                <path d="M16 270.8c.2 4 .9 7.9 2.1 11.6l88.5 259.6h51.3l29.4-86.3c15.2-44.5 39.5-84.9 71.3-118.4l11.4 34.2h50.1l-66.8-198h59l25.8 77.4h51V234.3L336.5 73.1 278.4 51.5 252 131.2c-29.3-23.9-63.5-39.6-100-45.7L124.7 16H73.3l52.9 154.2c-54 13.8-100.2 53-110.2 100.6z" />
            </svg>
        ),
    },
    {
        name: 'Supabase',
        color: '#3ECF8E',
        svg: (
            <svg viewBox="0 0 512 512" fill="currentColor" className="w-12 h-12">
                <path d="M256 0c-141.4 0-256 114.6-256 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm-29 378v-112h-81c-16 0-25-18-15-30l105-132c8-10 25-4 25 9v112h81c16 0 25 18 15 30L252 387c-8 10-25 4-25-9z" />
            </svg>
        ),
    }
];

const TechStack = () => {
    return (
        <Section background="white">
            <Container>
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-primary-orange uppercase tracking-widest mb-3">Our Stack</h2>
                        <h3 className="text-3xl lg:text-5xl font-heading font-extrabold text-primary-navy mb-6 tracking-tighter leading-tight">
                            Powered by Industry Standard <br /> <span className="text-primary-orange">Technologies</span>
                        </h3>
                        <p className="text-mid-slate text-lg max-w-2xl mx-auto leading-relaxed">
                            We leverage the most robust, performant, and reliable technologies in the modern web ecosystem to ensure your systems scale beautifully.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                        {techStack.map((tech, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center gap-4 group cursor-pointer"
                            >
                                <div
                                    className="w-24 h-24 bg-soft-gray rounded-3xl flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl shadow-sm border border-black/5"
                                    style={{ color: tech.color }}
                                >
                                    {tech.svg}
                                </div>
                                <span className="font-bold text-primary-navy opacity-80 group-hover:opacity-100 transition-opacity">
                                    {tech.name}
                                </span>
                            </div>
                        ))}

                        {/* "More coming soon" card */}
                        <div className="flex flex-col items-center gap-4 group cursor-default">
                            <div className="w-24 h-24 bg-soft-gray/50 rounded-3xl flex items-center justify-center transition-all duration-300 border-2 border-dashed border-black/15 text-mid-slate group-hover:border-primary-orange group-hover:text-primary-orange group-hover:bg-primary-orange/5">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M8 12h8"></path>
                                    <path d="M12 8v8"></path>
                                </svg>
                            </div>
                            <span className="font-bold text-mid-slate opacity-80 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                And More...
                            </span>
                        </div>
                    </div>
                </ScrollReveal>
            </Container>
        </Section>
    );
};

export default TechStack;
