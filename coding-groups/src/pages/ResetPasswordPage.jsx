import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient'
import SEO from '../components/SEO'

function ResetPasswordPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (!isSupabaseConfigured || !supabase) {
      setError('Supabase is not configured.')
      return
    }

    setIsSubmitting(true)
    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    })

    if (updateError) {
      setError(updateError.message)
    } else {
      setMessage('Password updated successfully. Redirecting to login...')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#020617_0%,_#0f172a_42%,_#7c2d12_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <SEO
        title="Reset Password"
        description="Create a new CodingGroups admin password."
        url="/reset-password"
        noIndex={true}
      />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl shadow-slate-950/30 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="bg-slate-950 px-8 py-10 text-white sm:px-10 lg:px-12">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-300">Security Access</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight">
              Create a new password.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Set a strong password to ensure your admin account remains secure. Once updated, you can sign in with your new credentials.
            </p>

            <div className="mt-10">
              <Link to="/login" className="text-sm font-semibold text-orange-300 transition hover:text-orange-200">
                &larr; Return to Login
              </Link>
            </div>
          </section>

          <section className="px-8 py-10 sm:px-10 lg:px-12 flex flex-col justify-center">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">Security Update</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-950">Update Password</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Enter your new administrative password below.
                </p>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700">
                  New Password
                  <input
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    placeholder="At least 6 characters"
                    required
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Confirm Password
                  <input
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    placeholder="Repeat new password"
                    required
                  />
                </label>
              </div>

              {message && (
                <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {message}
                </div>
              )}

              {error && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
