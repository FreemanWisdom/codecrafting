import React from 'react'
import { ContentPanel, SectionBadge, SummaryCard, StatusMessage, LoadingState } from './DashboardUI'

const getReviewQuote = (review) => review.quote ?? review.review ?? review.message ?? review.content ?? ''
const getReviewName = (review) => review.author ?? review.name ?? review.full_name ?? 'Anonymous reviewer'
const getReviewMeta = (review) => review.role ?? review.company ?? review.title ?? ''
const formatDateTime = (value) => (value ? new Date(value).toLocaleString() : '')

const ReviewModerator = ({ reviews, reviewCounts, reviewFeedback, activeReviewApproveId, activeReviewDeleteId, handleApproveReview, handleDeleteReview, loadReviews }) => {
  return (
    <ContentPanel
      title="Customer Testimonials"
      subtitle="Moderate feedback from your clients. Approved reviews will appear on the homepage."
      badge="Moderation"
      actions={
        <>
          <SectionBadge tone="emerald">{reviewCounts.approved} approved</SectionBadge>
          <SectionBadge tone="amber">{reviewCounts.pending} pending</SectionBadge>
          <button
            type="button"
            onClick={loadReviews}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Refresh
          </button>
        </>
      }
    >
      <div className="space-y-6">
        {reviewFeedback && (
          <StatusMessage tone={reviewFeedback.tone}>{reviewFeedback.message}</StatusMessage>
        )}

        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="p-12 text-center rounded-3xl border border-dashed border-slate-200 text-slate-500">
              No reviews submitted yet.
            </div>
          ) : (
            reviews.map((review) => {
              const isApproving = activeReviewApproveId === review.id
              const isDeleting = activeReviewDeleteId === review.id

              return (
                <article
                  key={review.id}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 transition hover:shadow-md"
                >
                  <div className="flex flex-wrap items-start justify-between gap-6">
                    <div className="flex-1 min-w-[300px]">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-bold text-slate-950">{getReviewName(review)}</h3>
                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                            review.approved ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {review.approved ? 'Approved' : 'Pending'}
                        </span>
                      </div>
                      {getReviewMeta(review) && (
                        <p className="mt-1 text-sm text-slate-500">{getReviewMeta(review)}</p>
                      )}
                      
                      <div className="mt-4 rounded-2xl bg-slate-50 p-4 border border-slate-100 italic text-slate-700 text-sm leading-relaxed">
                        "{getReviewQuote(review)}"
                      </div>

                      <p className="mt-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                        Submitted {formatDateTime(review.created_at)}
                      </p>
                    </div>

                    <div className="flex gap-2 bg-slate-100 p-1.5 rounded-full h-fit">
                      <button
                        type="button"
                        onClick={() => handleApproveReview(review)}
                        disabled={review.approved || isApproving || isDeleting}
                        className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-50 shadow-sm border border-emerald-100 disabled:opacity-50"
                      >
                        {review.approved ? 'Live' : isApproving ? '...' : 'Approve'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteReview(review)}
                        disabled={isDeleting || isApproving}
                        className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-50 shadow-sm border border-rose-100 disabled:opacity-50"
                      >
                        {isDeleting ? '...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </article>
              )
            })
          )}
        </div>
      </div>
    </ContentPanel>
  )
}

export default ReviewModerator
