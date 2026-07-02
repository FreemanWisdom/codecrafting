import React from 'react'
import { SummaryCard, ContentPanel } from './DashboardUI'

const OverviewPanel = ({ projectCounts, reviewCounts, waitlistCount }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Portfolio Projects"
          value={projectCounts.total}
          detail="Active items in your showcase."
          accent="orange"
        />
        <SummaryCard
          label="Reviews & Feedback"
          value={reviewCounts.total}
          detail={`${reviewCounts.pending} pending moderation.`}
          accent="navy"
        />
        <SummaryCard
          label="Waitlist Signups"
          value={waitlistCount}
          detail="Interested users waiting for contact."
          accent="emerald"
        />
        <SummaryCard
          label="Live Links"
          value={projectCounts.withLiveLink}
          detail="Projects with external URLs."
          accent="amber"
        />
      </div>

      <ContentPanel 
        title="Quick Actions" 
        subtitle="Commonly used management tools for your website."
        badge="Shortcuts"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <h3 className="font-semibold text-slate-950">Update Hero Section</h3>
            <p className="mt-2 text-sm text-slate-500">Change background image or update headline text.</p>
          </div>
          <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <h3 className="font-semibold text-slate-950">Approve Reviews</h3>
            <p className="mt-2 text-sm text-slate-500">You have {reviewCounts.pending} reviews waiting for approval.</p>
          </div>
          <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <h3 className="font-semibold text-slate-950">Add New Project</h3>
            <p className="mt-2 text-sm text-slate-500">Publish your latest work to the portfolio.</p>
          </div>
        </div>
      </ContentPanel>
    </div>
  )
}

export default OverviewPanel
