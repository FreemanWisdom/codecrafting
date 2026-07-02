import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { SectionBadge, StatusMessage, SummaryCard, ContentPanel } from './DashboardUI'

const WaitlistView = () => {
  const [waitlist, setWaitlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const fetchWaitlist = useCallback(async () => {
    setLoading(true)
    setFeedback(null)

    const { data, error } = await supabase.from('waitlist').select('*').order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      setFeedback({ tone: 'error', message: `Supabase error: ${error.message}` })
    } else {
      setWaitlist(data || [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchWaitlist()
  }, [fetchWaitlist])

  const deleteUser = async (id) => {
    const confirmed = window.confirm('Are you sure you want to remove this user from the waitlist?')
    if (!confirmed) return

    setDeletingId(id)
    const { error } = await supabase
      .from('waitlist')
      .delete()
      .eq('id', id)

    if (error) {
      setFeedback({ tone: 'error', message: error.message })
    } else {
      setFeedback({ tone: 'success', message: 'User removed from waitlist.' })
      fetchWaitlist()
    }
    setDeletingId(null)
  }

  return (
    <ContentPanel
      title="Leads & Prospects"
      subtitle="Potential clients who have expressed interest in your services."
      badge="Waitlist"
      actions={
        <>
          <SectionBadge tone="orange">{waitlist.length} leads</SectionBadge>
          <button
            type="button"
            onClick={fetchWaitlist}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Refresh
          </button>
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <SummaryCard
          label="Total Leads"
          value={waitlist.length}
          detail="Active email signups stored."
          accent="orange"
        />
        <SummaryCard
          label="Recent (24h)"
          value={waitlist.filter(u => new Date(u.created_at) > new Date(Date.now() - 86400000)).length}
          detail="Users who joined in the last day."
          accent="navy"
        />
      </div>

      {feedback && <div className="mb-6"><StatusMessage tone={feedback.tone}>{feedback.message}</StatusMessage></div>}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50/50 text-xs font-black uppercase tracking-widest text-slate-500">
            <tr>
              <th className="px-6 py-4">User Email</th>
              <th className="px-6 py-4">Signup Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="3" className="px-6 py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
                    Syncing database...
                  </div>
                </td>
              </tr>
            ) : waitlist.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-12 text-center text-slate-400 italic">No entries found.</td>
              </tr>
            ) : (
              waitlist.map((user) => (
                <tr key={user.id} className="group transition hover:bg-slate-50/30">
                  <td className="whitespace-nowrap px-6 py-5 font-bold text-slate-900">{user.email}</td>
                  <td className="whitespace-nowrap px-6 py-5 text-slate-600">
                    {new Date(user.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </td>
                  <td className="whitespace-nowrap px-6 py-5 text-right">
                    <button
                      onClick={() => deleteUser(user.id)}
                      disabled={deletingId === user.id}
                      className="inline-flex items-center justify-center rounded-full border border-rose-100 bg-white px-4 py-1.5 text-xs font-bold text-rose-600 transition hover:bg-rose-50 hover:border-rose-200 shadow-sm disabled:opacity-50"
                    >
                      {deletingId === user.id ? '...' : 'Remove'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </ContentPanel>
  )
}

export default WaitlistView
