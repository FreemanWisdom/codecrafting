import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ADMIN_EMAIL, ADMIN_EMAILS, getUserEmail, isAdminUser, isSupabaseConfigured, supabase } from '../lib/supabaseClient'
import SEO from '../components/SEO'

function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const redirectPath = location.state?.from?.pathname || '/admin'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authUser, setAuthUser] = useState(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const adminEmailsLabel = ADMIN_EMAILS.join(', ')

  useEffect(() => {
    let isMounted = true
    let subscription = null

    const syncUser = async () => {
      if (!isSupabaseConfigured || !supabase) {
        if (isMounted) setAuthUser(null)
        return
      }

      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (isMounted) setAuthUser(session?.user ?? null)
    }

    syncUser()

    if (isSupabaseConfigured && supabase) {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        if (isMounted) setAuthUser(session?.user ?? null)
      })
      subscription = data.subscription
    }

    return () => {
      isMounted = false
      subscription?.unsubscribe()
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')

    if (!email.trim() || !password) {
      setErrorMessage('Enter the admin email and password to continue.')
      return
    }

    if (!supabase) {
      setErrorMessage('Supabase is not configured for this environment.')
      return
    }

    setIsSubmitting(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (error) {
      setErrorMessage(error.message)
      setIsSubmitting(false)
      return
    }

    const user = data.user ?? null

    if (!isAdminUser(user, email)) {
      const signedInEmail = getUserEmail(user) || email.trim().toLowerCase() || 'unknown email'
      await supabase.auth.signOut()
      setErrorMessage(
        `Signed in as ${signedInEmail}. This account is not authorized for the admin dashboard.`,
      )
      setIsSubmitting(false)
      return
    }

    navigate(redirectPath, { replace: true })
    setIsSubmitting(false)
  }

  const handleSignOut = async () => {
    if (!supabase) {
      return
    }

    setIsSubmitting(true)
    await supabase.auth.signOut()
    setIsSubmitting(false)
    setErrorMessage('')
  }

  if (authUser !== undefined && authUser && isAdminUser(authUser)) {
    return <Navigate to={redirectPath} replace />
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#020617_0%,_#0f172a_42%,_#7c2d12_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <SEO
        title="Admin Login"
        description="Secure administrator sign-in for CodingGroups dashboard."
        url="/login"
        noIndex={true}
      />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl shadow-slate-950/30 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="bg-slate-950 px-8 py-10 text-white sm:px-10 lg:px-12">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-300">Admin Login</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight">
              Access the CodingGroups control room.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              This space is restricted to the configured admin accounts. Sign in with
              <span className="mx-1 font-semibold text-orange-300">{adminEmailsLabel}</span>
              to manage portfolio projects and review approvals.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="text-sm text-slate-300">Protected route</p>
                <p className="mt-2 text-lg font-semibold">The admin route only opens for configured admin emails</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="text-sm text-slate-300">Managed content</p>
                <p className="mt-2 text-lg font-semibold">Projects, storage uploads, and review moderation</p>
              </div>
            </div>

            <div className="mt-10">
              <Link to="/" className="text-sm font-semibold text-orange-300 transition hover:text-orange-200">
                Return to the website
              </Link>
            </div>
          </section>

          <section className="px-8 py-10 sm:px-10 lg:px-12">
            {!isSupabaseConfigured ? (
              <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm leading-7 text-rose-700">
                Supabase environment variables are missing. Add
                <code className="mx-1 rounded bg-white px-2 py-1 text-rose-800">VITE_SUPABASE_URL</code>
                and a publishable key before using admin auth.
              </div>
            ) : authUser && !isAdminUser(authUser) ? (
              <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">Wrong account</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">{getUserEmail(authUser) || 'Unknown account'} is signed in</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  That account does not match the configured admin emails. Sign out and log back in with
                  <span className="mx-1 font-semibold text-slate-950">{adminEmailsLabel}</span>.
                </p>
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSubmitting}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Signing out...' : 'Sign out'}
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">Secure access</p>
                  <h2 className="mt-2 text-3xl font-semibold text-slate-950">Sign in</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Use your Supabase Auth email and password. Non-admin accounts are blocked automatically.
                  </p>
                </div>

                <label className="block text-sm font-medium text-slate-700">
                  Email
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    placeholder={ADMIN_EMAIL}
                  />
                </label>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-700">Password</label>
                    <Link
                      to="/forgot-password"
                      className="text-xs font-semibold text-orange-500 hover:text-orange-600"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    placeholder="Enter your password"
                  />
                </div>

                {errorMessage ? (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {errorMessage}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting || authUser === undefined}
                  className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {authUser === undefined ? 'Checking session...' : isSubmitting ? 'Signing in...' : 'Sign in to admin'}
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
