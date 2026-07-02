import React from 'react';
import { clampRating } from '../utils/publicData';

export const StarRating = ({ rating = 0, onChange, readOnly = false, className = '' }) => {
    const safeRating = clampRating(rating);

    return (
        <div className={`flex items-center gap-1 ${className}`.trim()}>
            {Array.from({ length: 5 }, (_, index) => {
                const starValue = index + 1;
                const filled = starValue <= safeRating;
                const sharedClassName = `text-2xl leading-none transition-transform duration-200 ${filled ? 'text-primary-orange' : 'text-primary-navy/20'}`;

                if (readOnly) {
                    return (
                        <span key={starValue} className={sharedClassName} aria-hidden="true">
                            ★
                        </span>
                    );
                }

                return (
                    <button
                        key={starValue}
                        type="button"
                        onClick={() => onChange?.(starValue)}
                        className={`${sharedClassName} cursor-pointer hover:scale-110 focus:outline-none focus-visible:scale-110`}
                        aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
                        aria-pressed={filled}
                    >
                        ★
                    </button>
                );
            })}
        </div>
    );
};

const ReviewCard = ({ review }) => {
    const initials = review.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('');

    return (
        <article className="review-card h-full">
            <StarRating rating={review.rating} readOnly className="mb-5" />
            <blockquote className="mb-6 text-sm leading-7 text-mid-slate md:text-[0.95rem]">
                "{review.message}"
            </blockquote>
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-navy text-sm font-black text-white">
                    {initials || 'A'}
                </div>
                <div>
                    <p className="font-heading text-base font-bold text-primary-navy">{review.name}</p>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-orange/80">
                        Client Review
                    </p>
                </div>
            </div>
        </article>
    );
};

export default ReviewCard;
