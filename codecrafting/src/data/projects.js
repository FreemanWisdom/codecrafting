import mockup1 from '../assets/pictures/WorkMockup1.jpg';
import mockup2 from '../assets/pictures/WorkMockup2.jpg';
import mockup3 from '../assets/pictures/WorkMockup3.jpg';
import mockup4 from '../assets/pictures/WorkMockup4.jpg';

// Update this array to add, remove, or reorder portfolio projects across the site.
const projects = [
    {
        id: 'small-business-sales-engine',
        title: 'Small Business Sales Engine',
        category: 'Business',
        image: mockup1,
        tech: ['React', 'Tailwind CSS', 'Vite'],
        summary: 'A conversion-focused business website built to turn traffic into qualified leads.',
        problem: 'Client was losing leads due to a slow, confusing site that failed to communicate value.',
        solution: 'A high-performance sales engine with clear CTAs, speed optimization, and lead-capture funnels.',
        link: '',
        featured: true,
    },
    {
        id: 'saas-dashboard-architecture',
        title: 'SaaS Dashboard Architecture',
        category: 'Platform',
        image: mockup2,
        tech: ['React', 'Custom CMS', 'Firebase'],
        summary: 'A streamlined dashboard experience for complex enterprise reporting and faster team workflows.',
        problem: 'Complex data visualization and slow user workflows were reducing team efficiency.',
        solution: 'A streamlined, high-performance dashboard for enterprise-level data analysis.',
        link: '',
        featured: true,
    },
    {
        id: 'enterprise-brand-portal',
        title: 'Enterprise Brand Portal',
        category: 'Branding',
        image: mockup3,
        tech: ['React', 'Motion', 'Tailwind'],
        summary: 'A polished brand hub designed to communicate authority with editorial storytelling.',
        problem: 'Company needed a premium digital touchpoint that aligned with their high-end service model.',
        solution: 'A premium, one-page experience with custom animations, high-res galleries, and storytelling UX.',
        link: '',
        featured: true,
    },
    {
        id: 'real-estate-lead-portal',
        title: 'Real Estate Lead Portal',
        category: 'Business',
        image: mockup4,
        tech: ['React', 'Firebase', 'Tailwind'],
        summary: 'A responsive listing platform focused on faster inquiries and direct buyer conversations.',
        problem: 'Agent needed a way to showcase listings and capture buyer info instantly.',
        solution: 'A dynamic listing site with direct WhatsApp integration and automated inquiries.',
        link: '',
        featured: false,
    },
];

export const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

export default projects;
