import React from 'react';

const SkeletonCard = ({ text = 'Project coming soon' }) => {
    return (
        <article className="flex h-full flex-col overflow-hidden rounded-[32px] border border-black/5 bg-white p-5 shadow-[0_24px_60px_rgba(17,57,89,0.08)] md:p-6">
            <div className="mb-6 aspect-video animate-pulse rounded-[24px] bg-primary-navy/8" />
            <div className="mb-4 h-4 w-28 animate-pulse rounded-full bg-primary-orange/15" />
            <div className="mb-3 h-8 w-3/4 animate-pulse rounded-2xl bg-primary-navy/10" />
            <div className="space-y-3">
                <div className="h-3 animate-pulse rounded-full bg-primary-navy/8" />
                <div className="h-3 w-11/12 animate-pulse rounded-full bg-primary-navy/8" />
                <div className="h-3 w-4/5 animate-pulse rounded-full bg-primary-navy/8" />
            </div>
            <div className="mt-auto pt-8">
                <p className="rounded-2xl border border-dashed border-primary-orange/25 bg-primary-orange/5 px-4 py-4 text-center text-sm font-bold text-primary-navy">
                    {text}
                </p>
            </div>
        </article>
    );
};

export default SkeletonCard;
