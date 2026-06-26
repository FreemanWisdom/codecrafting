import React from 'react'

export function SectionBadge({ children, tone = 'slate' }) {
  const tones = {
    slate: 'border-slate-200 bg-slate-100 text-slate-700',
    orange: 'border-orange-200 bg-orange-50 text-orange-700',
    emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    amber: 'border-amber-200 bg-amber-50 text-amber-700',
    white: 'border-white/15 bg-white/10 text-white',
  }

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>
  )
}

export function StatusMessage({ tone = 'neutral', children }) {
  const styles = {
    neutral: 'border-slate-200/80 bg-white text-slate-700 shadow-sm shadow-slate-900/5',
    success: 'border-emerald-200 bg-emerald-50/90 text-emerald-700 shadow-sm shadow-emerald-900/5',
    error: 'border-rose-200 bg-rose-50/90 text-rose-700 shadow-sm shadow-rose-900/5',
  }

  return (
    <div className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${styles[tone]}`}>
      <span
        aria-hidden="true"
        className={`mt-1 h-2.5 w-2.5 rounded-full ${
          tone === 'success' ? 'bg-emerald-500' : tone === 'error' ? 'bg-rose-500' : 'bg-slate-400'
        }`}
      />
      <div>{children}</div>
    </div>
  )
}

export function SummaryCard({ label, value, detail, accent = 'navy' }) {
  const accents = {
    navy: 'border-slate-200 bg-[linear-gradient(145deg,_rgba(255,255,255,0.95),_rgba(226,232,240,0.82))] text-slate-950',
    orange:
      'border-orange-200 bg-[linear-gradient(145deg,_rgba(255,247,237,0.98),_rgba(255,237,213,0.88))] text-slate-950',
    emerald:
      'border-emerald-200 bg-[linear-gradient(145deg,_rgba(236,253,245,0.98),_rgba(209,250,229,0.84))] text-slate-950',
    amber:
      'border-amber-200 bg-[linear-gradient(145deg,_rgba(255,251,235,0.98),_rgba(254,243,199,0.88))] text-slate-950',
  }

  return (
    <div className={`rounded-[1.75rem] border p-5 shadow-lg shadow-slate-900/5 ${accents[accent]}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className="mt-4 text-3xl font-semibold tracking-tighter">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
    </div>
  )
}

export function LoadingState({ label = 'Fetching data...' }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-12 text-center shadow-lg">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
      <p className="mt-4 text-sm font-medium text-slate-700">{label}</p>
    </div>
  )
}

export function ContentPanel({ title, subtitle, badge, children, actions }) {
  return (
    <section className="rounded-[2rem] border border-white/60 bg-[linear-gradient(180deg,_rgba(255,255,255,0.97),_rgba(248,250,252,0.95))] p-6 shadow-2xl shadow-slate-900/5 backdrop-blur sm:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-8">
        <div>
          {badge && <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">{badge}</p>}
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">{title}</h2>
          {subtitle && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{subtitle}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
      </div>
      {children}
    </section>
  )
}
