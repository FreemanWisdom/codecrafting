import React, { useState } from 'react'
import { ContentPanel, SectionBadge } from './DashboardUI'
import WaitlistView from './WaitlistView'
import ReviewModerator from './ReviewModerator'

const EngagementManager = ({ reviews, reviewCounts, reviewFeedback, activeReviewApproveId, activeReviewDeleteId, handleApproveReview, handleDeleteReview, loadReviews }) => {
  const [subTab, setSubTab] = useState('reviews')

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex gap-2 bg-slate-100 p-1 rounded-full w-fit">
        <button
          onClick={() => setSubTab('reviews')}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
            subTab === 'reviews' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Customer Reviews
        </button>
        <button
          onClick={() => setSubTab('waitlist')}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
            subTab === 'waitlist' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Waitlist Leads
        </button>
      </div>

      {subTab === 'reviews' ? (
        <ReviewModerator 
          reviews={reviews}
          reviewCounts={reviewCounts}
          reviewFeedback={reviewFeedback}
          activeReviewApproveId={activeReviewApproveId}
          activeReviewDeleteId={activeReviewDeleteId}
          handleApproveReview={handleApproveReview}
          handleDeleteReview={handleDeleteReview}
          loadReviews={loadReviews}
        />
      ) : (
        <WaitlistView />
      )}
    </div>
  )
}

export default EngagementManager
