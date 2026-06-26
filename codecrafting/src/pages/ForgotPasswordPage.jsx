import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient'
import SEO from '../components/SEO'
import { toAbsoluteUrl } from '../config/site'

const getResetRedirectUrl = () => {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}/reset-password`
  }

  return toAbsoluteUrl('/reset-password')
}

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    if (!isSupabaseConfigured || !supabase) {
      setError('Supabase is not configured.')
      return
    }

    setIsSubmitting(true)
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: getResetRedirectUrl(),
    })

    if (resetError) {
      setError(resetError.message)
    } else {
      setMessage('Check your email for the password reset link.')
    }
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#020617_0%,_#0f172a_42%,_#7c2d12_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <SEO
        title="Forgot Password"
        description="Reset your CodingGroups admin account password."
        url="/forgot-password"
        noIndex={true}
      />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl shadow-slate-950/30 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="bg-slate-950 px-8 py-10 text-white sm:px-10 lg:px-12">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-300">Security Access</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight">
              Forgot your admin password?
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              No problem. Enter your email address and we'll send you a secure link to reset it.
            </p>

            <div className="mt-10">
              <Link to="/login" className="text-sm font-semibold text-orange-300 transition hover:text-orange-200">
                &larr; Back to Login
              </Link>
            </div>
          </section>

          <section className="px-8 py-10 sm:px-10 lg:px-12 flex flex-col justify-center">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">Account Recovery</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-950">Reset Password</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Enter the email associated with your admin account.
                </p>
              </div>

              <label className="block text-sm font-medium text-slate-700">
                Email Address
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  placeholder="admin@example.com"
                  required
                />
              </label>

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
                {isSubmitting ? 'Sending link...' : 'Send Reset Link'}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
