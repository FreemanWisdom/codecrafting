import React, { useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon } from '@hugeicons/core-free-icons';
import { Link } from 'react-router-dom';
import Container from '../components/Container';

const NotFoundPage = () => {
    useEffect(() => {
        document.title = '404 — Page Not Found | CodeCrafting';
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center page-enter">
            <Container>
                <div className="text-center max-w-lg mx-auto">
                    <div className="text-8xl sm:text-9xl font-heading font-extrabold text-primary-orange/20 mb-4 tracking-tighter">
                        404
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-primary-navy mb-4 tracking-tighter">
                        Page Not Found
                    </h1>
                    <p className="text-mid-slate mb-10 leading-relaxed">
                        The page you're looking for doesn't exist or has been moved.
                        Let's get you back on track.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-primary-orange text-white font-medium rounded-md hover:bg-primary-orange/90 transition-all duration-300 transform active:scale-95"
                    >
                        <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
                        Back to Home
                    </Link>
                </div>
            </Container>
        </div>
    );
};

export default NotFoundPage;
