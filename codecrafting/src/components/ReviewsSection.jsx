import React, { useEffect, useState } from 'react';
import Button from './Button';
import Section from './Section';
import Container from './Container';
import ScrollReveal from './ScrollReveal';
import ReviewCard from './ReviewCard';
import useApprovedReviews from '../hooks/useApprovedReviews';

const loadingPlaceholders = Array.from({ length: 3 }, (_, index) => index);

const ReviewsSection = ({
    background = 'soft',
    heading = 'Client Reviews',
    title = 'Trusted by teams that needed clarity, speed, and polish.',
    description = 'A concise look at the feedback behind recent launches, kept intentionally focused so the work itself stays front and center.',
    limit = 3,
}) => {
    const { reviews, loading, error } = useApprovedReviews();
    const [showAllReviews, setShowAllReviews] = useState(false);
    const hasHiddenReviews = Number.isFinite(limit) && limit > 0 && reviews.length > limit;
    const visibleReviews = showAllReviews ? reviews : reviews.slice(0, limit);

    useEffect(() => {
        setShowAllReviews(false);
    }, [limit, reviews.length]);

    return (
        <Section background={background} className="reviews-section">
            <Container className="reviews-section-inner relative z-10">
                <ScrollReveal>
                    <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
                        <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-primary-orange">{heading}</h2>
                        <h3 className="mb-4 text-3xl font-heading font-extrabold tracking-tighter text-primary-navy md:text-4xl">
                            {title}
                        </h3>
                        <p className="text-base leading-relaxed text-mid-slate md:text-lg">
                            {description}
                        </p>
                    </div>
                </ScrollReveal>

                {error ? (
                    <p className="mx-auto mb-8 max-w-2xl rounded-3xl border border-red-200 bg-red-50 px-6 py-4 text-center text-sm font-semibold text-red-600">
                        {error}
                    </p>
                ) : null}

                {loading ? (
                    <div className="reviews-grid">
                        {loadingPlaceholders.map((item) => (
                            <div key={item} className="review-card animate-pulse">
                                <div className="mb-5 h-6 w-28 rounded-full bg-primary-orange/15" />
                                <div className="mb-3 h-4 rounded-full bg-primary-navy/10" />
                                <div className="mb-3 h-4 w-11/12 rounded-full bg-primary-navy/10" />
                                <div className="mb-6 h-4 w-4/5 rounded-full bg-primary-navy/10" />
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-primary-navy/10" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-32 rounded-full bg-primary-navy/10" />
                                        <div className="h-3 w-20 rounded-full bg-primary-orange/15" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : null}

                {!loading && !error && visibleReviews.length > 0 ? (
                    <>
                        <div className="reviews-grid">
                            {visibleReviews.map((review, index) => (
                                <ScrollReveal key={review.id} delay={index * 0.15} variant="fade-up">
                                    <ReviewCard review={review} />
                                </ScrollReveal>
                            ))}
                        </div>

                        {hasHiddenReviews && !showAllReviews ? (
                            <ScrollReveal delay={0.2} variant="fade-up">
                                <div className="mt-10 flex flex-col items-center gap-4 text-center">
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-navy/45 sm:text-sm">
                                        Showing {visibleReviews.length} of {reviews.length} reviews
                                    </p>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowAllReviews(true)}
                                        className="min-w-[14rem] px-8 py-4"
                                    >
                                        See all reviews
                                    </Button>
                                </div>
                            </ScrollReveal>
                        ) : null}
                    </>
                ) : null}

                {!loading && !error && visibleReviews.length === 0 ? (
                    <p className="mx-auto max-w-2xl rounded-[32px] border border-dashed border-primary-orange/25 bg-white px-8 py-10 text-center text-lg font-semibold text-primary-navy shadow-[0_18px_40px_rgba(17,57,89,0.06)]">
                        Be the first to leave a review
                    </p>
                ) : null}
            </Container>
        </Section>
    );
};

export default ReviewsSection;
